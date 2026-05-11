import Link from "next/link"
import { notFound } from "next/navigation"
import PhotoGrid from "@/app/_components/PhotoGrid"
import { getFolderBySlug } from "@/app/_lib/photos"

export default async function PreWeddingFolderPage({
  params,
}: {
  params: Promise<{ folder: string }>
}) {
  const { folder: slug } = await params
  const folder = await getFolderBySlug("pre-wedding", slug)
  if (!folder) notFound()

  return (
    <div>
      <header className="px-8 pt-12 pb-2 flex items-center gap-3">
        <Link
          href="/gallery/pre-wedding"
          className="text-[10px] tracking-[0.3em] uppercase text-white/30 hover:text-white/60 transition-colors"
        >
          ← Pre-Wedding
        </Link>
        <span className="text-white/15">/</span>
        <h2 className="text-2xl font-extralight tracking-widest text-white uppercase">
          {folder.name}
        </h2>
        <span className="text-[10px] text-white/25 ml-2">{folder.photos.length} photos</span>
      </header>
      <PhotoGrid photos={folder.photos} />
    </div>
  )
}
