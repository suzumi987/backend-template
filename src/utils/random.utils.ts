import crypto from 'crypto'

function randomNumber(length: number) {
    return Math.floor(Math.random() * length);
}

function randomString(length: number) {
    return crypto.randomBytes(length).toString('hex');
}

export {
    randomNumber,
    randomString,
}