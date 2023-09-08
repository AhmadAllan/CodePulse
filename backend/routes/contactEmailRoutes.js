import express from 'express';
import sendEmail from '../utils/sendEmail.js';
const router = express.Router();

// Route for sending contact emails
router.post('/sendContactEmail', (req, res) => {
  const { senderName, senderEmail,reportType, subject, message } = req.body;

  // Check if required fields are provided
  if (!senderName || !senderEmail || !subject || !message) {
    return res.status(400).json({ error: 'Please fill out all required fields.' });
  }

  try {
    // Send the email using the sendEmail module
    sendEmail.sendContactEmail(senderName, senderEmail,reportType, subject, message);

    // Respond with a success message
    res.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal server error while sending the email.' });
  }
});

export default router;
