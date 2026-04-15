export function randomHex(): string {
  const h = Math.floor(Math.random() * 360)
  const s = 40 + Math.floor(Math.random() * 40)
  const l = 55 + Math.floor(Math.random() * 25)
  const c = document.createElement('canvas')
  c.width = 1
  c.height = 1
  const ctx = c.getContext('2d')!
  ctx.fillStyle = `hsl(${h},${s}%,${l}%)`
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return (
    '#' +
    [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase()
  )
}

export function isValidHex(v: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(v)
}

export function normalizeHex(v: string): string {
  let h = v.trim()
  if (!h.startsWith('#')) h = '#' + h
  return h
}
