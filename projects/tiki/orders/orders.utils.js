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

module.exports = {
    dollarToCents
}