import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "aaa200265@gmail.com",
    pass: "tltylknhhxwrjiam",
  },
});

const sendEmail = (email, otp) => {
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

export default sendEmail;
