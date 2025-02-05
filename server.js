require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Konfigurasi Nodemailer (gunakan akun Hostinger)
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: "info@swamplily.io", // Email Hostinger
    pass: "Swamplily14!", // Password email
  },
});

// Endpoint untuk menangani form submission
app.post("/submit", async (req, res) => {
  const { firstName, lastName, email, serviceDate, service, message } = req.body;

  const mailOptions = {
    from: "info@swamplily.io",
    to: "info@swamplily.io", // Email tujuan (dapat dikirim ke email yang sama atau lainnya)
    subject: "New Service Request from Swamp Lily Contact Form",
    text: `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Desired Date of Service: ${serviceDate}
      Service: ${service}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to send email" });
  }
});

// Jalankan server di port 3000
app.listen(3000, () => console.log("Server running on port 3000"));
