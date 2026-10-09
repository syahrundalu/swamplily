<?php

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require __DIR__ . '/vendor/autoload.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit;
}

$firstName = trim($_POST['first-name'] ?? '');
$lastName = trim($_POST['last-name'] ?? '');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$service = trim($_POST['service'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($firstName === '' || $email === false || $service === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Please complete all required fields.']);
    exit;
}

$smtpConfigFile = dirname(__DIR__) . '/smtp-config.php';
$smtpPassword = '';

if (is_readable($smtpConfigFile)) {
    try {
        $smtpConfig = require $smtpConfigFile;

        if (is_array($smtpConfig)) {
            $smtpPassword = trim((string) ($smtpConfig['password'] ?? ''));
        }
    } catch (Throwable $exception) {
        error_log('Swamp Lily SMTP configuration error: ' . $exception->getMessage());
    }
}

// Keep environment-variable support for local development and other deployments.
if ($smtpPassword === '') {
    $smtpPassword = trim((string) getenv('SWAMPLILY_SMTP_PASSWORD'));
}

if ($smtpPassword === '') {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Email service is not configured.']);
    exit;
}

$escape = static fn (string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$fullName = trim($firstName . ' ' . $lastName);
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@swamplily.co.id';
    $mail->Password = $smtpPassword;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    $mail->setFrom('info@swamplily.co.id', 'Swamp Lily Website');
    $mail->addReplyTo($email, $fullName);
    $mail->addAddress('info@swamplily.co.id');

    $mail->isHTML(true);
    $mail->Subject = "New website enquiry from {$fullName}";
    $mail->Body = '<p><strong>Name:</strong> ' . $escape($fullName) . '</p>'
        . '<p><strong>Email:</strong> ' . $escape($email) . '</p>'
        . '<p><strong>Service:</strong> ' . $escape($service) . '</p>'
        . '<p><strong>Message:</strong><br>' . nl2br($escape($message)) . '</p>';
    $mail->AltBody = "Name: {$fullName}\nEmail: {$email}\nService: {$service}\nMessage:\n{$message}";

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Your request has been sent successfully!']);
} catch (Exception $exception) {
    http_response_code(500);
    error_log('Swamp Lily contact form mail error: ' . $mail->ErrorInfo);
    echo json_encode(['status' => 'error', 'message' => 'Email could not be sent. Please contact us via WhatsApp.']);
}
