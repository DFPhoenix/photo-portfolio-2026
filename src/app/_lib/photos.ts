import fs from "fs"
import path from "path"

export type Photo = {
  id: string
  title: string
  category: "wedding" | "portrait"
  src: string
  portrait: boolean
}

const IMAGE_RE = /\.(jpg|jpeg|png|webp|avif)$/i
const PORTRAIT_RE = /-p\.(jpg|jpeg|png|webp|avif)$/i

function titleFromFilename(file: string): string {
  return path.basename(file, path.extname(file))
    .replace(/-p$/, "")           // strip trailing -p portrait marker
    .replace(/[-_]+/g, " ")       // hyphens/underscores → spaces
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}

function scanCategory(category: "wedding" | "portrait"): Photo[] {
  const dir = path.join(process.cwd(), "public", "photos", category)
  let files: string[]
  try {
    files = fs.readdirSync(dir).filter((f) => IMAGE_RE.test(f)).sort()
  } catch {
    return []
  }
  return files.map((file, i) => ({
    id: `${category[0]}${i + 1}`,
    title: titleFromFilename(file),
    category,
    src: `/photos/${category}/${file}`,
    portrait: PORTRAIT_RE.test(file),
  }))
}

export function getPhotosByCategory(category: "wedding" | "portrait"): Photo[] {
  return scanCategory(category)
}

export function getAllPhotos(): Photo[] {
  return [...scanCategory("wedding"), ...scanCategory("portrait")]
}
