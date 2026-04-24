import Image from "next/image"
import { Photo } from "@/app/_lib/photos"

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 p-8">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="relative break-inside-avoid mb-3 overflow-hidden group cursor-pointer"
        >
          <div
            className="relative"
            style={{ aspectRatio: photo.portrait ? "4/5" : "3/2" }}
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-end">
            <p className="w-full px-4 py-3 text-white text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              {photo.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
