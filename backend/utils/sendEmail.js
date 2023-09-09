import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "aaa200265@gmail.com",
    pass: "tltylknhhxwrjiam",
  },
});

const sendOtpEmail = (email, otp) => {
  const mailOptions = {
    from: "aaa200265@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for registration is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending OTP email: ", error);
    } else {
      console.log("OTP email sent: ", info.response);
    }
  });
};

const sendContactEmail = (senderName, senderEmail,reportType, subject, message) => {
  const mailOptions = {
    from: "aaa200265@gmail.com",
    to: senderEmail, // Replace with the recipient's email address
    subject: subject,
    text: `Sender Name: ${senderName}\nSender Email: ${senderEmail}\nReport Type: ${reportType}\n\nMessage:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending contact email: ", error);
    } else {
      console.log("Contact email sent: ", info);
    }
  });
};

export default {sendOtpEmail, sendContactEmail};
