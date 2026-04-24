import PhotoGrid from "@/app/_components/PhotoGrid"
import { getPhotosByCategory } from "@/app/_lib/photos"

export const metadata = { title: "Wedding — Studio" }

export default function WeddingPage() {
  const photos = getPhotosByCategory("wedding")
  return (
    <div>
      <header className="px-8 pt-12 pb-2">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Collection</p>
        <h2 className="text-2xl font-extralight tracking-widest text-white uppercase">Wedding</h2>
      </header>
      <PhotoGrid photos={photos} />
    </div>
  )
}
