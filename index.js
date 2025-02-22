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
    // subject: "Application for SDE - Front End Role",
    subject: "Request for Referral – JNU Student Seeking Opportunity at Optum",
//     text: `Dear HR,

// I hope this email finds you well.

// My name is Yuvraj Singh Chouhan, and I have one year of hands-on experience as a Frontend Developer, specializing in React and Angular. Throughout my career, I have developed multiple production-level applications, focusing on building scalable, efficient, and user-friendly interfaces.

// I have also attached my resume for your consideration.

// I look forward to the opportunity to connect and discuss how my skills align with your organization’s goals.

// Best regards,  
// Yuvraj Singh Chouhan  
// Phone: +91 7747023697`,
    text: `Dear Sir/Madam.

I hope you're doing well. I am Yuvraj Singh Chouhan, a fellow JNU student, and I recently came across an opening at Optum that aligns with my skill set. Since you are already a part of Optum, I wanted to reach out to see if you could kindly refer me for the role.

It would be a great help in my job search, and I would truly appreciate any guidance or support you can provide. Looking forward to your response.

Best regards,
Yuvraj Singh Chouhan
7747023697`,
    attachments: [
      {
        filename: "resume.pdf",
        path: "./resume.pdf", // Ensure the file exists
        contentType: "application/pdf",
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
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
