const nodemailer = require('nodemailer');

// Email service configuration
const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER || 'montopizza@gmail.com',
        pass: process.env.SMTP_PASS || 'your-app-password'
    }
});

// Send email function
const sendEmail = async (to, subject, htmlContent) => {
    try {
        const mailOptions = {
            from: `"MontoPizza" <${process.env.SMTP_USER || 'montopizza@gmail.com'}>`,
            to: to,
            subject: subject,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email error:', error);
        return { success: false, error: error.message };
    }
};

// Email templates
const emailTemplates = {
    orderCreated: (trackingNumber, customerName, orderDetails) => `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>MontoPizza - Order Confirmation</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
                .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #b81b1b 0%, #8b0000 100%); color: white; padding: 30px; text-align: center; }
                .header img { height: 60px; margin-bottom: 15px; filter: brightness(0) invert(1); }
                .header h1 { margin: 0; font-size: 2rem; font-weight: 600; }
                .content { padding: 40px 30px; }
                .tracking-number { background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; border-left: 4px solid #b81b1b; }
                .tracking-number span { font-family: monospace; font-size: 1.2rem; font-weight: bold; color: #b81b1b; }
                .order-details { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .order-details h3 { color: #b81b1b; margin-bottom: 15px; }
                .order-details p { margin: 5px 0; color: #333; }
                .status-timeline { display: flex; justify-content: space-between; margin: 30px 0; flex-wrap: wrap; gap: 5px; }
                .status-step { flex: 1; text-align: center; padding: 12px; background: #e0e0e0; border-radius: 6px; font-weight: 600; font-size: 0.8rem; }
                .status-step.active { background: #b81b1b; color: white; }
                .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 0.9rem; }
                .cta-button { display: inline-block; background: #b81b1b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
                .cta-button:hover { background: #8b0000; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://your-domain.com/images/logo.png" alt="MontoPizza">
                    <h1>Order Confirmed!</h1>
                </div>
                <div class="content">
                    <p>Dear <strong>${customerName}</strong>,</p>
                    <p>Thank you for your order! We're preparing your delicious pizza and will have it delivered to you soon.</p>
                    
                    <div class="tracking-number">
                        <p>Tracking Number:</p>
                        <span>${trackingNumber}</span>
                    </div>
                    
                    <div class="order-details">
                        <h3>Order Details</h3>
                        <p><strong>Name:</strong> ${customerName}</p>
                        <p><strong>Order:</strong> ${orderDetails.description || 'Pizza order'}</p>
                        <p><strong>Address:</strong> ${orderDetails.address}</p>
                        <p><strong>Phone:</strong> ${orderDetails.phone || 'Not provided'}</p>
                    </div>
                    
                    <div class="status-timeline">
                        <div class="status-step active">Order Received</div>
                        <div class="status-step">Preparing</div>
                        <div class="status-step">On The Way</div>
                        <div class="status-step">Delivered</div>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="https://your-domain.com/track" class="cta-button">Track Your Order</a>
                    </div>
                    
                    <p>You can track your order in real-time using the tracking number above or by clicking the button below.</p>
                </div>
                <div class="footer">
                    <p>Thank you for choosing MontoPizza!</p>
                    <p>Questions? Contact us at +7 (964) 041-70-47</p>
                </div>
            </div>
        </body>
        </html>
    `,

    statusUpdate: (trackingNumber, newStatus, comment) => `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>MontoPizza - Order Status Update</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
                .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #b81b1b 0%, #8b0000 100%); color: white; padding: 30px; text-align: center; }
                .header img { height: 60px; margin-bottom: 15px; filter: brightness(0) invert(1); }
                .header h1 { margin: 0; font-size: 2rem; font-weight: 600; }
                .content { padding: 40px 30px; }
                .status-update { background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 20px 0; text-align: center; border-left: 4px solid #b81b1b; }
                .status-badge { display: inline-block; background: #b81b1b; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; text-transform: uppercase; margin: 10px 0; }
                .tracking-number { font-family: monospace; font-size: 1.1rem; color: #666; margin: 10px 0; }
                .comment { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0; color: #856404; }
                .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 0.9rem; }
                .cta-button { display: inline-block; background: #b81b1b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
                .cta-button:hover { background: #8b0000; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://your-domain.com/images/logo.png" alt="MontoPizza">
                    <h1>Order Status Update</h1>
                </div>
                <div class="content">
                    <p>Your order status has been updated!</p>
                    
                    <div class="status-update">
                        <div class="tracking-number">Tracking: ${trackingNumber}</div>
                        <div class="status-badge">${newStatus}</div>
                        <div class="comment">${comment}</div>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="https://your-domain.com/tracking/${trackingNumber}" class="cta-button">Track Your Order</a>
                    </div>
                </div>
                <div class="footer">
                    <p>Thank you for choosing MontoPizza!</p>
                    <p>Questions? Contact us at +7 (964) 041-70-47</p>
                </div>
            </div>
        </body>
        </html>
    `,

    orderDelivered: (trackingNumber, customerName) => `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>MontoPizza - Order Delivered!</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
                .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; }
                .header img { height: 60px; margin-bottom: 15px; filter: brightness(0) invert(1); }
                .header h1 { margin: 0; font-size: 2rem; font-weight: 600; }
                .content { padding: 40px 30px; text-align: center; }
                .success-icon { font-size: 4rem; margin-bottom: 20px; }
                .success-message { font-size: 1.5rem; color: #28a745; font-weight: 600; margin-bottom: 20px; }
                .tracking-number { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745; }
                .tracking-number span { font-family: monospace; font-size: 1.2rem; font-weight: bold; color: #28a745; }
                .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 0.9rem; }
                .cta-button { display: inline-block; background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
                .cta-button:hover { background: #20c997; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://your-domain.com/images/logo.png" alt="MontoPizza">
                    <h1>Delivered! 🎉</h1>
                </div>
                <div class="content">
                    <div class="success-icon">🍕</div>
                    <div class="success-message">Your order has been delivered!</div>
                    <p>Dear <strong>${customerName}</strong>,</p>
                    <p>Your delicious pizza has been successfully delivered. We hope you enjoy your meal!</p>
                    
                    <div class="tracking-number">
                        <p>Tracking Number:</p>
                        <span>${trackingNumber}</span>
                    </div>
                    
                    <p>Thank you for choosing MontoPizza! We'd love to hear your feedback.</p>
                    
                    <div>
                        <a href="https://your-domain.com/contact" class="cta-button">Leave Feedback</a>
                    </div>
                </div>
                <div class="footer">
                    <p>Enjoy your pizza! 🍕</p>
                    <p>Questions? Contact us at +7 (964) 041-70-47</p>
                </div>
            </div>
        </body>
        </html>
    `
};

module.exports = {
    sendEmail,
    emailTemplates
};
