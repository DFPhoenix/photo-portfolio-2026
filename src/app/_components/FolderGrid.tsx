import type { PhotoFolder } from "@/app/_lib/photos"
import FolderCard from "./FolderCard"

export default function FolderGrid({ folders }: { folders: PhotoFolder[] }) {
  if (folders.length === 0) {
    return (
      <p className="px-8 pt-16 text-sm text-white/25 tracking-widest">
        No folders found.
      </p>
    )
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 p-8">
      {folders.map((folder) => (
        <FolderCard key={`${folder.category}-${folder.slug}`} folder={folder} />
      ))}
    </div>
  )
}
