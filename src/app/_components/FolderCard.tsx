"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import type { PhotoFolder } from "@/app/_lib/photos"

export default function FolderCard({ folder }: { folder: PhotoFolder }) {
  const [index, setIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()

  const photo = folder.photos[index]
  const total = folder.photos.length
  const isFolder = total > 1

  function stepThumbnail(dir: 1 | -1, e: React.MouseEvent) {
    e.stopPropagation()
    setIndex((i) => (i + dir + total) % total)
  }

  function stepLightbox(dir: 1 | -1, e: React.MouseEvent) {
    e.stopPropagation()
    setIndex((i) => (i + dir + total) % total)
  }

  function handleCardClick() {
    if (!isFolder) {
      // Single photo — open lightbox immediately, no double-click navigation
      setLightboxOpen(true)
      return
    }
    if (clickTimer.current) {
      clearTimeout(clickTimer.current)
      clickTimer.current = null
      router.push(`/gallery/${folder.category}/${folder.slug}`)
    } else {
      clickTimer.current = setTimeout(() => {
        clickTimer.current = null
        setLightboxOpen(true)
      }, 300)
    }
  }

  return (
    <>
      <div
        className="group relative cursor-pointer select-none"
        onClick={handleCardClick}
      >
        {/* Stack cards — only shown when folder has multiple photos */}
        {total > 2 && (
          <div
            className="absolute inset-0 bg-neutral-800 border border-white/10"
            style={{ transform: "rotate(-2.5deg)", transformOrigin: "bottom center" }}
          />
        )}
        {total > 1 && (
          <div
            className="absolute inset-0 bg-neutral-700 border border-white/10"
            style={{ transform: "rotate(1.8deg)", transformOrigin: "bottom center" }}
          />
        )}

        {/* Thumbnail — fixed portrait frame, never resizes while cycling.
            Portrait photos: object-cover fills the frame fully.
            Landscape photos: object-contain shows the full image with dark letterbox bars. */}
        <div className="relative overflow-hidden bg-neutral-950" style={{ aspectRatio: "4/5" }}>
          <Image
            src={photo.src}
            alt={photo.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`transition-transform duration-500 group-hover:scale-105 ${
              photo.portrait ? "object-cover" : "object-contain"
            }`}
          />

          {/* Thumbnail arrows — only for multi-photo folders */}
          {isFolder && (
            <>
              <button
                onClick={(e) => stepThumbnail(-1, e)}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white text-2xl leading-none opacity-0 group-hover:opacity-100 transition-all duration-200"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                onClick={(e) => stepThumbnail(1, e)}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white text-2xl leading-none opacity-0 group-hover:opacity-100 transition-all duration-200"
                aria-label="Next photo"
              >
                ›
              </button>
            </>
          )}

          {/* Dot indicators (folders with 2–12 photos) */}
          {isFolder && total <= 12 && (
            <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1 z-10 pointer-events-none">
              {folder.photos.map((_, i) => (
                <span
                  key={i}
                  className={`block w-1 h-1 rounded-full transition-colors duration-200 ${
                    i === index ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />
        </div>

        {/* Label */}
        <div className="mt-3 flex items-baseline justify-between px-0.5">
          <span className="text-xs tracking-wider text-white/60">{folder.name}</span>
          {isFolder && (
            <span className="text-[10px] text-white/25 tabular-nums">{total} photos</span>
          )}
        </div>
        {isFolder && (
          <p className="px-0.5 mt-1 text-[10px] text-white/20 tracking-widest">
            Click to preview · Double-click to open
          </p>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-8"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-6 text-white/40 hover:text-white text-3xl leading-none transition-colors z-10"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
          >
            ×
          </button>

          {/* Lightbox arrows — only for folders */}
          {isFolder && (
            <>
              <button
                onClick={(e) => stepLightbox(-1, e)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white text-4xl leading-none transition-all duration-200"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                onClick={(e) => stepLightbox(1, e)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white text-4xl leading-none transition-all duration-200"
                aria-label="Next photo"
              >
                ›
              </button>
            </>
          )}

          {/* Photo */}
          <div
            className="relative w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Caption */}
          <p className="absolute bottom-5 inset-x-0 text-center text-[10px] tracking-[0.4em] uppercase text-white/30 pointer-events-none">
            {isFolder ? `${index + 1} / ${total} — ` : ""}{photo.title}
          </p>
        </div>
      )}
    </>
  )
}
