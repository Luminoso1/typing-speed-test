const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '~!@#$%^&*()_-+={}[]|\\\'"<>:;,./?'

export const ALLOWED_KEYS = [
  ...ALPHABET,
  ...ALPHABET.toUpperCase(),
  ...NUMBERS,
  ...SYMBOLS,
  ' ',
  'Backspace',
] as const

export const LEVELS = ['easy', 'medium', 'hard'] as const

export const MODES = ['timed', 'passage'] as const

export const DURATIONS = [15, 30, 60, 120] as const

export const DEFAULT_TIME = 60 // seconds
