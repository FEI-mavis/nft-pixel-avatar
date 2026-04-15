import { useCallback } from 'react'
import { isValidHex, normalizeHex, randomHex } from '../utils/color'
import { MAX_COLORS } from '../constants'

interface Props {
  colors: string[]
  onChange: (colors: string[]) => void
  onToast: (msg: string) => void
}

export default function PaletteEditor({ colors, onChange, onToast }: Props) {
  const updateAt = useCallback(
    (idx: number, hex: string) => {
      const next = [...colors]
      next[idx] = hex
      onChange(next)
    },
    [colors, onChange],
  )

  const removeAt = useCallback(
    (idx: number) => {
      if (colors.length <= 1) {
        onToast('至少保留一个颜色')
        return
      }
      onChange(colors.filter((_, i) => i !== idx))
    },
    [colors, onChange, onToast],
  )

  const add = useCallback(() => {
    if (colors.length >= MAX_COLORS) {
      onToast(`最多支持 ${MAX_COLORS} 个颜色`)
      return
    }
    onChange([...colors, randomHex()])
  }, [colors, onChange, onToast])

  return (
    <div className="sec">
      <div className="sec-label">色板（可自由调色、增减）</div>
      <div className="palette-list">
        {colors.map((hex, idx) => (
          <div className="palette-item" key={idx}>
            <span className="palette-num">{idx + 1}</span>
            <div className="palette-swatch" style={{ background: hex }}>
              <input
                type="color"
                value={hex}
                onChange={(e) => updateAt(idx, e.target.value)}
              />
            </div>
            <input
              type="text"
              className="palette-hex"
              value={hex.toUpperCase()}
              maxLength={7}
              onChange={(e) => {
                const v = normalizeHex(e.target.value)
                if (isValidHex(v)) updateAt(idx, v)
              }}
              onBlur={(e) => {
                const v = normalizeHex(e.target.value)
                if (!isValidHex(v)) {
                  e.target.value = hex.toUpperCase()
                }
              }}
            />
            <button
              className="palette-del"
              title="删除"
              onClick={() => removeAt(idx)}
            >
              <svg viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <button className="palette-add" onClick={add}>
        <svg viewBox="0 0 24 24">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        添加颜色
      </button>
    </div>
  )
}
