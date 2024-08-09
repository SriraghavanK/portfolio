var a= document.getElementById("email").value;
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse the form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS, Images)
app.use(express.static(path.join(__dirname)));

// Route to serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Route to handle the contact form submission
app.post("/send", (req, res) => {
  const { name, email, phone, message } = req.body;

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "testing143web@gmail.com", // replace with your email
      pass: "jhso jooo asvs jprb", // replace with your email password
    },
  });

  // Setup email data
  let mailOptions = {
    from: email, // sender address
    to: "testing143web@gmail.com", // your email address
    subject: "New Contact Form Submission",
    text: `You have a new message from ${name} (${email}),${phone}:\n\n${message}`,
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Something went wrong.");
    }
    res.status(200).send("Message sent successfully!");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
