import type { PixelItem } from '../types'
import PixelCard from './PixelCard'
import EmptyState from './EmptyState'

interface Props {
  items: PixelItem[]
  colors: string[]
  bg: string
  border: string
  selected: Set<number>
  onToggleSelect: (id: number) => void
  onToggleAll: () => void
  allSelected: boolean
  onToast: (msg: string) => void
}

export default function Gallery({
  items,
  colors,
  bg,
  border,
  selected,
  onToggleSelect,
  onToggleAll,
  allSelected,
  onToast,
}: Props) {
  const selCount = selected.size
  const total = items.length
  const countText =
    selCount > 0 ? `共 ${total} 张，已选 ${selCount} 张` : `共 ${total} 张`

  return (
    <div className="gallery">
      <div className="gallery-header">
        <div className="gallery-count">{countText}</div>
        <button className="btn-select-all" onClick={onToggleAll}>
          {allSelected ? '取消全选' : '全选'}
        </button>
      </div>
      <div className="gallery-grid">
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          items.map((item) => (
            <PixelCard
              key={item.id}
              id={item.id}
              matrix={item.matrix}
              colors={colors}
              bg={bg}
              border={border}
              selected={selected.has(item.id)}
              onToggle={onToggleSelect}
              onToast={onToast}
            />
          ))
        )}
      </div>
    </div>
  )
}
