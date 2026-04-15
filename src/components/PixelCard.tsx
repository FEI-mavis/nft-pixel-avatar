import { useRef, useEffect, useCallback } from 'react'
import { renderToCanvas } from '../utils/pixel'
import { triggerDownload } from '../utils/download'

interface Props {
  id: number
  matrix: number[][]
  colors: string[]
  bg: string
  border: string
  selected: boolean
  onToggle: (id: number) => void
  onToast: (msg: string) => void
}

export default function PixelCard({
  id,
  matrix,
  colors,
  bg,
  border,
  selected,
  onToggle,
  onToast,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      renderToCanvas(canvasRef.current, matrix, colors, bg, border)
    }
  }, [matrix, colors, bg, border])

  const handleDownload = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (canvasRef.current) {
        const name = `pixel-${String(id).padStart(4, '0')}.png`
        triggerDownload(canvasRef.current.toDataURL('image/png'), name)
        onToast(`已保存 #${String(id).padStart(4, '0')}`)
      }
    },
    [id, onToast],
  )

  return (
    <div
      className={`card${selected ? ' selected' : ''}`}
      data-id={id}
      onClick={() => onToggle(id)}
    >
      <canvas ref={canvasRef} />
      <div className="card-check">
        <svg viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div className="card-bar">
        <span className="card-id">#{String(id).padStart(4, '0')}</span>
        <button className="card-dl" title="下载" onClick={handleDownload}>
          <svg viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
      </div>
    </div>
  )
}
