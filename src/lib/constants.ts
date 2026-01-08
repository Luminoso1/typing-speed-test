const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '~!@#$%^&*()_-+={}[]|\\\'"<>:;,./?'

export const ALLOWED_KEYS = [
  ...ALPHABET,
  ...ALPHABET.toUpperCase(),
  ...NUMBERS,
  ...SYMBOLS,
  ' ',
] as const

export const LEVELS = ['easy', 'medium', 'hard'] as const

export const MODES = [
  { label: 'Timed (60s)', value: 'timed' },
  { label: 'passage', value: 'passage' },
] as const
