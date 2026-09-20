<?php
declare(strict_types=1);

$root = dirname(__DIR__);
$extensions = ['html', 'css', 'js', 'json', 'php'];
$skipDirectories = ['.git', 'images', 'vendor', 'tools', 'node_modules'];
$changedFiles = 0;
$changedReferences = 0;

$iterator = new RecursiveIteratorIterator(
    new RecursiveCallbackFilterIterator(
        new RecursiveDirectoryIterator($root, FilesystemIterator::SKIP_DOTS),
        static function (SplFileInfo $file) use ($skipDirectories): bool {
            return !$file->isDir() || !in_array($file->getFilename(), $skipDirectories, true);
        }
    )
);

foreach ($iterator as $file) {
    if (!$file->isFile() || !in_array(strtolower($file->getExtension()), $extensions, true)) continue;
    $path = $file->getPathname();
    $contents = file_get_contents($path);
    $localChanges = 0;
    $updated = preg_replace_callback(
        '#images/(?!optimized/)([^\'"\)\r\n?]+?)\.(jpe?g)#i',
        static function (array $match) use ($root, &$localChanges): string {
            $relative = str_replace('/', DIRECTORY_SEPARATOR, $match[1] . '.webp');
            $optimized = $root . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'optimized' . DIRECTORY_SEPARATOR . $relative;
            if (!is_file($optimized)) return $match[0];
            $localChanges++;
            return 'images/optimized/' . $match[1] . '.webp';
        },
        $contents
    );
    if ($localChanges > 0 && $updated !== $contents) {
        file_put_contents($path, $updated);
        $changedFiles++;
        $changedReferences += $localChanges;
    }
}

printf("Updated %d image references across %d files.\n", $changedReferences, $changedFiles);
