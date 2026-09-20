<?php
declare(strict_types=1);

$root = dirname(__DIR__);
$sourceRoot = $root . DIRECTORY_SEPARATOR . 'images';
$outputRoot = $sourceRoot . DIRECTORY_SEPARATOR . 'optimized';
$maxDimension = 2400;
$quality = 88;

function normalizeOrientation(GdImage $image, string $path): GdImage
{
    if (!function_exists('exif_read_data')) return $image;
    $exif = @exif_read_data($path);
    $orientation = (int)($exif['Orientation'] ?? 1);
    return match ($orientation) {
        3 => imagerotate($image, 180, 0),
        6 => imagerotate($image, -90, 0),
        8 => imagerotate($image, 90, 0),
        default => $image,
    };
}

$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($sourceRoot, FilesystemIterator::SKIP_DOTS)
);
$written = 0;
$sourceBytes = 0;
$outputBytes = 0;

foreach ($iterator as $file) {
    if (!$file->isFile() || str_starts_with($file->getPathname(), $outputRoot)) continue;
    $extension = strtolower($file->getExtension());
    if (!in_array($extension, ['jpg', 'jpeg'], true)) continue;

    $source = $file->getPathname();
    $relative = substr($source, strlen($sourceRoot) + 1);
    $destination = $outputRoot . DIRECTORY_SEPARATOR . preg_replace('/\.(jpe?g)$/i', '.webp', $relative);
    $destinationDirectory = dirname($destination);
    if (!is_dir($destinationDirectory)) mkdir($destinationDirectory, 0777, true);

    $image = @imagecreatefromjpeg($source);
    if (!$image) continue;
    $image = normalizeOrientation($image, $source);
    $width = imagesx($image);
    $height = imagesy($image);
    $scale = min(1, $maxDimension / max($width, $height));
    $targetWidth = max(1, (int)round($width * $scale));
    $targetHeight = max(1, (int)round($height * $scale));

    if ($targetWidth !== $width || $targetHeight !== $height) {
        $resized = imagecreatetruecolor($targetWidth, $targetHeight);
        imagecopyresampled($resized, $image, 0, 0, 0, 0, $targetWidth, $targetHeight, $width, $height);
        imagedestroy($image);
        $image = $resized;
    }

    imagewebp($image, $destination, $quality);
    imagedestroy($image);
    $written++;
    $sourceBytes += $file->getSize();
    $outputBytes += filesize($destination);
}

printf("Optimized %d images: %.2f MB -> %.2f MB\n", $written, $sourceBytes / 1048576, $outputBytes / 1048576);
