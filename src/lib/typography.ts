const NBSP = '\u00A0'
const NBHY = '\u2011'

const shortWordPattern =
  /(^|[\s(«"„])([А-Яа-яA-Za-zЁё]{1,2}|без|вне|для|меж|над|под|при|про|через|это|эти|эта|этот|как|чем|если|либо)\s+/g

export function typographRu(input: string) {
  return input
    .replace(/(\+\d)\s(\d{3})\s(\d{3})-(\d{2})-(\d{2})/g, `$1${NBSP}$2${NBSP}$3${NBHY}$4${NBHY}$5`)
    .replace(/\s-\s/g, ' — ')
    .replace(/(\d)\s+(?=[A-Za-zА-Яа-яЁё])/g, `$1${NBSP}`)
    .replace(/\s+=\s+/g, `${NBSP}=${NBSP}`)
    .replace(/(\d)\s+(₽|%)/g, `$1${NBSP}$2`)
    .replace(/№\s+(\d)/g, `№${NBSP}$1`)
    .replace(shortWordPattern, (_, prefix: string, word: string) => `${prefix}${word}${NBSP}`)
}
