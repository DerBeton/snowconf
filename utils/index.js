/* returns a number with specific amount of digits */
export function toMultiDigit(number, digits) {
    return number.toLocaleString(
        'en-US',
        { minimumIntegerDigits: digits }
    );
}