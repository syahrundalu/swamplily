<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Pastikan untuk memasukkan path yang benar ke PHPMailer

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['first-name'];
    $lastName = $_POST['last-name'];
    $email = $_POST['email'];
    $serviceDate = $_POST['service-date'];
    $service = $_POST['service'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.hostinger.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'info@swamplily.io'; // Alamat email pengirim
        $mail->Password = 'Swamplily14!';     // Password email pengirim
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 465;                    // Port untuk SMTP

        // Penerima
        $mail->setFrom('info@swamplily.io', 'Swamp Lily');
        $mail->addAddress('info@swamplily.io', 'Swamp Lily'); // Penerima email

        // Konten email
        $mail->isHTML(true);
        $mail->Subject = 'New Service Request';
        $mail->Body = "You have received a new service request from:<br>
                       <strong>Name:</strong> $firstName $lastName<br>
                       <strong>Email:</strong> $email<br>
                       <strong>Service Date:</strong> $serviceDate<br>
                       <strong>Service:</strong> $service<br>
                       <strong>Message:</strong> $message";

        $mail->send();
        echo json_encode(["message" => "Email sent successfully!"]);
    } catch (Exception $e) {
        echo json_encode(["message" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
    }
}
?>
