import crypto from 'crypto'

export const createHash = (stringToHash) => {
    const hash = crypto.createHash('sha256').update(stringToHash).digest('hex')
}