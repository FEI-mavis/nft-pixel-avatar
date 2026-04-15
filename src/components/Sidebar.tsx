import PaletteEditor from './PaletteEditor'
import ColorPicker from './ColorPicker'

interface Props {
  colors: string[]
  bg: string
  border: string
  sym: boolean
  count: number
  onColorsChange: (c: string[]) => void
  onBgChange: (v: string) => void
  onBorderChange: (v: string) => void
  onSymChange: (v: boolean) => void
  onCountChange: (v: number) => void
  onGenerate: () => void
  onDownloadSelected: () => void
  onClear: () => void
  onToast: (msg: string) => void
}

export default function Sidebar({
  colors,
  bg,
  border,
  sym,
  count,
  onColorsChange,
  onBgChange,
  onBorderChange,
  onSymChange,
  onCountChange,
  onGenerate,
  onDownloadSelected,
  onClear,
  onToast,
}: Props) {
  return (
    <div className="sidebar">
      <div className="sidebar-scroll">
        <PaletteEditor colors={colors} onChange={onColorsChange} onToast={onToast} />

        <div className="sec">
          <div className="sec-label">背景 / 边框</div>
          <ColorPicker label="背景色" value={bg} onChange={onBgChange} />
          <ColorPicker label="边框色" value={border} onChange={onBorderChange} />
        </div>

        <div className="sec">
          <div className="sec-label">生成选项</div>
          <div className="opt-row">
            <label>水平对称</label>
            <label className="toggle">
              <input
                type="checkbox"
                checked={sym}
                onChange={(e) => onSymChange(e.target.checked)}
              />
              <div className="track"></div>
              <div className="thumb"></div>
            </label>
          </div>
          <div className="opt-row">
            <label>每次生成数量</label>
            <div className="num-input">
              <button onClick={() => onCountChange(Math.max(1, count - 1))}>−</button>
              <input type="text" className="num-val" value={count} readOnly />
              <button onClick={() => onCountChange(Math.min(100, count + 1))}>+</button>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar-fixed">
        <div className="btn-group">
          <button className="btn btn-primary" onClick={onGenerate}>
            生成像素头像
          </button>
          <button className="btn btn-secondary" onClick={onDownloadSelected}>
            批量下载选中
          </button>
        </div>
        <div className="btn-group-danger">
          <button className="btn btn-danger" style={{ width: '100%' }} onClick={onClear}>
            清空画廊
          </button>
        </div>
      </div>
    </div>
  )
}
