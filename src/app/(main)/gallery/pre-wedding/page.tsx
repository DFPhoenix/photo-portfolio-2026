import FolderGrid from "@/app/_components/FolderGrid"
import { getFoldersByCategory } from "@/app/_lib/photos"

export const metadata = { title: "Pre-Wedding — ThereIsAShutter Photography" }

export default async function PreWeddingPage() {
  const folders = await getFoldersByCategory("pre-wedding")
  return (
    <div>
      <header className="px-8 pt-12 pb-2">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Collection</p>
        <h2 className="text-2xl font-extralight tracking-widest text-white uppercase">Pre-Wedding</h2>
      </header>
      <FolderGrid folders={folders} />
    </div>
  )
}
