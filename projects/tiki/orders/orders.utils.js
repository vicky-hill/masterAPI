const sendEmail = require('../../../utils/sendgrid')

/**
 * Calculate stripe cent amount
 * @param {number} amount
 * @returns 
 */
const dollarToCents = amount => {
    const str = amount.toString()
    const [int] = str.split('.')

    return Number(amount.toFixed(2).replace('.', '').padEnd(int.length === 1 ? 3 : 4, '0'))
}

const sendConfirmationEmail = async (email) => {
    const html = `
    <div>
    <strong>Your Order has been placed!</strong>
    <p>Best regards,</p>
    </div>`

    await sendEmail({
        to: email,
        html,
        subject: "Order Confirmation",
    });

}


module.exports = {
    dollarToCents,
    sendConfirmationEmail
}