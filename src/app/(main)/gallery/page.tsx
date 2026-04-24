import PhotoGrid from "@/app/_components/PhotoGrid"
import { getAllPhotos } from "@/app/_lib/photos"

export const metadata = { title: "Gallery — Studio" }

export default function GalleryHomePage() {
  const photos = getAllPhotos()
  return (
    <div>
      <header className="px-8 pt-12 pb-2">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">All Work</p>
        <h2 className="text-2xl font-extralight tracking-widest text-white uppercase">Homepage</h2>
      </header>
      <PhotoGrid photos={photos} />
    </div>
  )
}
