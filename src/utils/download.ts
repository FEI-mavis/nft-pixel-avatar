import JSZip from 'jszip'

export function triggerDownload(href: string, filename: string): void {
  const a = document.createElement('a')
  a.download = filename
  a.href = href
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  setTimeout(() => a.remove(), 100)
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b!), 'image/png'))
}

export async function downloadCanvasesAsZip(
  entries: { canvas: HTMLCanvasElement; id: number }[],
): Promise<void> {
  const zip = new JSZip()
  for (const { canvas, id } of entries) {
    const blob = await canvasToBlob(canvas)
    zip.file(`pixel-${String(id).padStart(4, '0')}.png`, blob)
  }
  const zipBlob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(zipBlob)
  triggerDownload(url, `pixel-avatars-${Date.now()}.zip`)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
