// require("dotenv").config();
// const nodemailer = require("nodemailer");
// const fs = require("fs");

// const sendEmail = async (recipientEmail) => {
//   try {
//     // Configure SMTP Transport
//     let transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Email content
//     let mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: recipientEmail, // Change this
//       subject: "Your Resume Submission",
//       text: "Hello, \n\nPlease find my resume attached. \n\nBest Regards,\nYour Name",
//       attachments: [
//         {
//           filename: "resume.pdf",
//           path: "./resume.pdf", 
//         },
//       ],
//     };

//     // Send Email
//     let info = await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent: " + info.response);
//   } catch (error) {
//     console.error("❌ Error sending email:", error);
//   }
// };

// sendEmail("ys030198@gmail.com");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

// Nodemailer Config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


app.post("/send-email", async (req, res) => {
  const { recipientEmail } = req.body;

  if (!recipientEmail) {
    return res.status(400).json({ error: "Recipient email is required" });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: "Your Resume Submission",
    text: "Hello, \n\nPlease find my resume attached.\n\nBest Regards,\nYour Name",
    attachments: [
      {
        filename: "resume.pdf",
        path: "./resume.pdf", // Ensure the file exists
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Start Server
const PORT =  5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
