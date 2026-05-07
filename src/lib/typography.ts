const NBSP = '\u00A0'
const NBHY = '\u2011'
const SPACE_OR_NBSP = `\\s${NBSP}`
const BREAKABLE_SPACES = '[ \\t\\r\\n\\f\\v]+'

const shortWordPattern =
  new RegExp(
    `(^|[${SPACE_OR_NBSP}(«"„])([А-Яа-яA-Za-zЁё]{1,2}|без|вне|для|меж|над|под|при|про|через|это|эти|эта|этот|как|чем|если|либо)${BREAKABLE_SPACES}`,
    'g',
  )

export function typographRu(input: string) {
  const normalized = input
    .replace(/(\+\d)\s(\d{3})\s(\d{3})-(\d{2})-(\d{2})/g, `$1${NBSP}$2${NBSP}$3${NBHY}$4${NBHY}$5`)
    .replace(/\s-\s/g, ' — ')
    .replace(/(\d)\s+(?=[A-Za-zА-Яа-яЁё])/g, `$1${NBSP}`)
    .replace(/\s+=\s+/g, `${NBSP}=${NBSP}`)
    .replace(/(\d)\s+(₽|%)/g, `$1${NBSP}$2`)
    .replace(/№\s+(\d)/g, `№${NBSP}$1`)

  let result = normalized

  for (let i = 0; i < 5; i += 1) {
    const next = result.replace(shortWordPattern, (_, prefix: string, word: string) => `${prefix}${word}${NBSP}`)
    if (next === result) {
      break
    }
    result = next
  }

  return result
}
