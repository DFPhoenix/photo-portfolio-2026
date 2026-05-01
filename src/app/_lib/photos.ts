import { v2 as cloudinary } from "cloudinary"
import { unstable_cache } from "next/cache"
import path from "path"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dpfvicaqf",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export type Photo = {
  id: string
  title: string
  category: "wedding" | "portrait"
  src: string
  portrait: boolean
}

type CloudinaryResource = {
  public_id: string
  width: number
  height: number
}

function resourceToPhoto(
  r: CloudinaryResource,
  category: "wedding" | "portrait",
  index: number
): Photo {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dpfvicaqf"
  const filename = path.basename(r.public_id)
  const title = filename
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()

  return {
    id: `${category[0]}${index + 1}`,
    title,
    category,
    src: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${r.public_id}`,
    portrait: r.height > r.width,
  }
}

async function fetchCategory(category: "wedding" | "portrait"): Promise<Photo[]> {
  try {
    const result = await cloudinary.api.resources_by_asset_folder(`galleries/${category}`, {
      resource_type: "image",
      max_results: 500,
    })
    return (result.resources as CloudinaryResource[])
      .sort((a, b) => a.public_id.localeCompare(b.public_id))
      .map((r, i) => resourceToPhoto(r, category, i))
  } catch (err) {
    console.error(`Failed to fetch ${category} photos from Cloudinary:`, err)
    return []
  }
}

// Cache each category separately; both share the "gallery" tag for revalidation
export const getPhotosByCategory = unstable_cache(fetchCategory, ["cloudinary-gallery"], {
  tags: ["gallery"],
})

export async function getAllPhotos(): Promise<Photo[]> {
  const [wedding, portrait] = await Promise.all([
    getPhotosByCategory("wedding"),
    getPhotosByCategory("portrait"),
  ])
  return [...wedding, ...portrait]
}
