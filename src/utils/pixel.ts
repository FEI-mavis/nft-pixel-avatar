import { SIZE, GRID, CELL, BORDER } from '../constants'

export function generateMatrix(colorCount: number, symmetric: boolean): number[][] {
  const matrix: number[][] = Array.from({ length: GRID }, () => Array(GRID).fill(-1))

  function randIdx(): number {
    if (Math.random() < 0.45) return -1
    return Math.floor(Math.random() * colorCount)
  }

  if (symmetric) {
    const halfCols = Math.ceil(GRID / 2)
    for (let r = 0; r < GRID; r++) {
      for (let c = 0; c < halfCols; c++) {
        const v = randIdx()
        matrix[r][c] = v
        matrix[r][GRID - 1 - c] = v
      }
    }
  } else {
    for (let r = 0; r < GRID; r++) {
      for (let c = 0; c < GRID; c++) {
        matrix[r][c] = randIdx()
      }
    }
  }
  return matrix
}

export function renderToCanvas(
  canvas: HTMLCanvasElement,
  matrix: number[][],
  colors: string[],
  bg: string,
  border: string,
): void {
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = border
  ctx.fillRect(0, 0, SIZE, SIZE)

  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      const x = BORDER + c * CELL
      const y = BORDER + r * CELL
      const idx = matrix[r][c]
      ctx.fillStyle = idx >= 0 && idx < colors.length ? colors[idx] : bg
      ctx.fillRect(x, y, CELL, CELL)
    }
  }
}
