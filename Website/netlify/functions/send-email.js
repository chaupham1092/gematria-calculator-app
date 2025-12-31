const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Parse the form data sent in the request body
    const { name, email, subject, message } = JSON.parse(event.body);

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use another service if you prefer
        auth: {
            user: process.env.EMAIL_USER,   // Use environment variable for email
            pass: process.env.EMAIL_PASS,   // Use environment variable for password
        },
    });

    // Set up the email options
    const mailOptions = {
        from: email,
        to: 'your-email@example.com', // Replace with your actual email
        subject: `New message from ${name}: ${subject}`,
        text: message,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Message sent successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send message' }),
        };
    }
};
