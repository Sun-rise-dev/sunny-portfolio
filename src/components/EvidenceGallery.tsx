/**
 * EvidenceGallery — 脱敏物证图集；无图时展示可验证说明，不伪造占位
 */
import type { WorkImage } from '../types'

interface EvidenceGalleryProps {
  images?: WorkImage[]
  /** 无截图时的可验证说明 */
  proofHint: string
}

export default function EvidenceGallery({ images, proofHint }: EvidenceGalleryProps) {
  if (!images || images.length === 0) {
    return (
      <section aria-labelledby="evidence-title">
        <h2 id="evidence-title" className="section-block-title">
          可验证物证
        </h2>
        <p className="border border-dashed border-hairline bg-paper-deep/40 px-4 py-6 text-sm text-ink-soft">
          {proofHint}
        </p>
      </section>
    )
  }

  return (
    <section aria-labelledby="evidence-title">
      <h2 id="evidence-title" className="section-block-title">
        交付物证（脱敏）
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {images.map((item) => (
          <figure key={item.src} className="border border-hairline bg-paper overflow-hidden">
            <img
              src={item.src}
              alt={item.caption}
              width={item.width ?? 1280}
              height={item.height ?? 800}
              className="w-full h-auto object-cover"
              style={{ aspectRatio: `${item.width ?? 1280} / ${item.height ?? 800}` }}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="px-3 py-2 text-ink-faint text-xs">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
