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
    user: "hello@swamplily.co.id",
    pass: process.env.SWAMPLILY_SMTP_PASSWORD,
  },
});

// Endpoint untuk menangani form submission
app.post("/submit", async (req, res) => {
  const { firstName, lastName, email, serviceDate, service, message } = req.body;

  const mailOptions = {
    from: "Swamp Lily Website <hello@swamplily.co.id>",
    replyTo: email,
    to: "hello@swamplily.co.id",
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
