const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail({ to, cc, subject, html }) {
    const msg = {
        to,
        subject,
        html,
        from: "vicky.ungemach95@gmail.com"
    };

    if (cc) msg.cc = cc;

    try {
        const result = await sgMail.send(msg);
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = sendEmail;