import { CharValue } from './statuses'

export const FIRST_ROW = 'ЉЊЕРТЅУИОПШЃЖ'.split('')
export const SECOND_ROW = 'АСДФГХЈКЛЧЌ'.split('')
export const THIRD_ROW = 'ЗЏЦВБНМ'.split('')

export const LETTERS_MK = [...FIRST_ROW, ...SECOND_ROW, ...THIRD_ROW]
export const LETTERS_EN = "QWERTYUIOP[]\\ASDFGHJKL;'ZXCVBNM".split('')

export function convert(letter: string): string {
    return LETTERS_MK[LETTERS_EN.findIndex((it) => it === letter)]
}

export type KeyValue = CharValue | 'ENTER' | 'DELETE'
