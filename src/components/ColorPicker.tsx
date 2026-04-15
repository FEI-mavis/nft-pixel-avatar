import { useCallback } from 'react'
import { isValidHex, normalizeHex } from '../utils/color'

interface Props {
  label: string
  value: string
  onChange: (hex: string) => void
}

export default function ColorPicker({ label, value, onChange }: Props) {
  const handleHex = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = normalizeHex(e.target.value)
      if (isValidHex(v)) {
        onChange(v)
      }
    },
    [onChange],
  )

  return (
    <div className="color-row">
      <label>{label}</label>
      <div className="color-input-wrap">
        <div className="color-swatch" style={{ background: value }}>
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <input
          type="text"
          className="color-hex"
          value={value.toUpperCase()}
          maxLength={7}
          onChange={(e) => {
            const v = normalizeHex(e.target.value)
            if (isValidHex(v)) onChange(v)
          }}
          onBlur={handleHex}
        />
      </div>
    </div>
  )
}
