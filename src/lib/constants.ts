const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '~!@#$%^&*()_-+={}[]|\\\'"<>:;,./?'

export const ALLOWED_KEYS = [
  ...ALPHABET,
  ...ALPHABET.toUpperCase(),
  ...NUMBERS,
  ...SYMBOLS,
  ' ',
]
