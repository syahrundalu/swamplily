<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = htmlspecialchars($_POST['first-name']);
    $lastName = htmlspecialchars($_POST['last-name']);
    $email = htmlspecialchars($_POST['email']);
    $serviceDate = htmlspecialchars($_POST['service-date']);
    $service = htmlspecialchars($_POST['service']);
    $message = htmlspecialchars($_POST['message']);
    
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.hostinger.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'info@swamplily.io';
        $mail->Password = 'Swamplily14!';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;
        
        $mail->setFrom('info@swamplily.io', 'Swamplily Contact');
        $mail->addReplyTo($email, "$firstName $lastName"); // Tambahkan Reply-To
        $mail->addAddress('info@swamplily.io');
        
        $mail->isHTML(true);
        $mail->Subject = "New Service Request from $firstName $lastName";
        $mail->Body = "<p><strong>Name:</strong> $firstName $lastName</p>
                        <p><strong>Email:</strong> $email</p>
                        <p><strong>Service Date:</strong> $serviceDate</p>
                        <p><strong>Service:</strong> $service</p>
                        <p><strong>Message:</strong><br>$message</p>";
        
        $mail->send();
        echo json_encode(["status" => "success", "message" => "Your request has been sent successfully!"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Email could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
    }
}
