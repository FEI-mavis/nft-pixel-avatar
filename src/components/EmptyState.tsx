export default function EmptyState() {
  return (
    <div className="empty">
      <svg
        className="empty-ico"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="8" y="8" width="48" height="48" rx="4" />
        <rect x="18" y="18" width="10" height="10" />
        <rect x="36" y="18" width="10" height="10" />
        <rect x="18" y="36" width="10" height="10" />
        <rect x="36" y="36" width="10" height="10" />
        <rect x="27" y="27" width="10" height="10" />
      </svg>
      <div className="empty-t">还没有生成任何图片</div>
      <div className="empty-d">调整左侧参数，点击「生成像素头像」开始</div>
    </div>
  )
}
