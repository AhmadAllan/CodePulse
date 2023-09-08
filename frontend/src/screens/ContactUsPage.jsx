import { useState } from 'react';
import axios from 'axios';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    reportType: 'contactUs',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({}); // Store validation errors

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = {};
    if (!formData.senderName) {
      validationErrors.senderName = 'Sender Name is required';
    }
    if (!formData.senderEmail) {
      validationErrors.senderEmail = 'Sender Email is required';
    }
    if (!formData.subject) {
      validationErrors.subject = 'Subject is required';
    }
    if (!formData.message) {
      validationErrors.message = 'Message is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('/api/contact/sendContactEmail', formData);

      if (response.status === 200) {
        // Email sent successfully
        console.log('Email sent successfully!');
      } else {
        // Handle errors if necessary
        console.error('Email sending failed.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 border-l-2 border-gray-900 pl-3">Contact Us</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="senderName" className="block text-gray-700 font-medium">
            Your Name
          </label>
          <input
            type="text"
            id="senderName"
            name="senderName"
            value={formData.senderName}
            onChange={handleInputChange}
            className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.senderName ? 'border-red-500' : ''
            }`}
            placeholder="Your Name"
          />
          {errors.senderName && <p className="text-red-500 text-sm mt-1">{errors.senderName}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="senderEmail" className="block text-gray-700 font-medium">
            Your Email
          </label>
          <input
            type="email"
            id="senderEmail"
            name="senderEmail"
            value={formData.senderEmail}
            onChange={handleInputChange}
            className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.senderEmail ? 'border-red-500' : ''
            }`}
            placeholder="Your Email"
          />
          {errors.senderEmail && <p className="text-red-500 text-sm mt-1">{errors.senderEmail}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="reportType" className="block text-gray-700 font-medium">
            Type of Report
          </label>
          <select
            id="reportType"
            name="reportType"
            value={formData.reportType}
            onChange={handleInputChange}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="contactUs">Contact Us</option>
            <option value="reportBug">Report Bug</option>
            <option value="requestFeature">Request Feature</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700 font-medium">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.subject ? 'border-red-500' : ''
            }`}
            placeholder="Subject"
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleInputChange}
            className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.message ? 'border-red-500' : ''
            }`}
            placeholder="Your Message"
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUsPage;