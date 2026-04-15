import { useState, useCallback, useRef } from 'react'
import type { PixelItem } from './types'
import { DEFAULT_COLORS, DEFAULT_BG, DEFAULT_BORDER } from './constants'
import { generateMatrix } from './utils/pixel'
import { triggerDownload, downloadCanvasesAsZip } from './utils/download'
import { useToast } from './hooks/useToast'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import Gallery from './components/Gallery'
import Toast from './components/Toast'

export default function App() {
  const [colors, setColors] = useState<string[]>(DEFAULT_COLORS)
  const [bg, setBg] = useState(DEFAULT_BG)
  const [border, setBorder] = useState(DEFAULT_BORDER)
  const [sym, setSym] = useState(true)
  const [count, setCount] = useState(12)
  const [items, setItems] = useState<PixelItem[]>([])
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const idRef = useRef(0)
  const toast = useToast()

  const generate = useCallback(() => {
    if (colors.length === 0) {
      toast.show('请至少添加一个颜色')
      return
    }
    const newItems: PixelItem[] = []
    for (let i = 0; i < count; i++) {
      const id = ++idRef.current
      newItems.push({ id, matrix: generateMatrix(colors.length, sym) })
    }
    setItems((prev) => [...newItems, ...prev])
    toast.show(`已生成 ${count} 张像素头像`)
  }, [colors.length, count, sym, toast])

  const toggleSelect = useCallback((id: number) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const allSelected = items.length > 0 && selected.size === items.length

  const toggleAll = useCallback(() => {
    if (allSelected) {
      setSelected(new Set())
    } else {
      setSelected(new Set(items.map((it) => it.id)))
    }
  }, [allSelected, items])

  const downloadSelected = useCallback(async () => {
    if (selected.size === 0) {
      toast.show('请先点击图片选中要下载的')
      return
    }
    const cards = document.querySelectorAll<HTMLDivElement>('.card.selected')
    const entries: { canvas: HTMLCanvasElement; id: number }[] = []
    cards.forEach((card) => {
      const canvas = card.querySelector('canvas')
      const id = parseInt(card.dataset.id || '0')
      if (canvas) entries.push({ canvas, id })
    })

    if (entries.length === 1) {
      const { canvas, id } = entries[0]
      triggerDownload(
        canvas.toDataURL('image/png'),
        `pixel-${String(id).padStart(4, '0')}.png`,
      )
      toast.show('已下载 1 张图片')
      return
    }

    toast.show(`正在打包 ${entries.length} 张图片...`)
    await downloadCanvasesAsZip(entries)
    toast.show(`已下载 ${entries.length} 张图片（ZIP）`)
  }, [selected, toast])

  const clearGallery = useCallback(() => {
    setItems([])
    setSelected(new Set())
    idRef.current = 0
  }, [])

  return (
    <div className="app">
      <Topbar />
      <Sidebar
        colors={colors}
        bg={bg}
        border={border}
        sym={sym}
        count={count}
        onColorsChange={setColors}
        onBgChange={setBg}
        onBorderChange={setBorder}
        onSymChange={setSym}
        onCountChange={setCount}
        onGenerate={generate}
        onDownloadSelected={downloadSelected}
        onClear={clearGallery}
        onToast={toast.show}
      />
      <Gallery
        items={items}
        colors={colors}
        bg={bg}
        border={border}
        selected={selected}
        onToggleSelect={toggleSelect}
        onToggleAll={toggleAll}
        allSelected={allSelected}
        onToast={toast.show}
      />
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  )
}
