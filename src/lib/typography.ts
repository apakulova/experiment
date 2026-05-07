const NBSP = '\u00A0'

const shortWordPattern =
  /(^|[\s(«"„])([А-Яа-яA-Za-zЁё]{1,2}|без|вне|для|меж|над|под|при|про|через|это|эти|эта|этот|как|чем|если|либо)\s+/g

export function typographRu(input: string) {
  return input
    .replace(/\s-\s/g, ' — ')
    .replace(/(\d)\s+(?=[A-Za-zА-Яа-яЁё])/g, `$1${NBSP}`)
    .replace(/\s+=\s+/g, `${NBSP}=${NBSP}`)
    .replace(/(\d)\s+(₽|%)/g, `$1${NBSP}$2`)
    .replace(/№\s+(\d)/g, `№${NBSP}$1`)
    .replace(shortWordPattern, (_, prefix: string, word: string) => `${prefix}${word}${NBSP}`)
}
