import { v2 as cloudinary } from "cloudinary"
import { unstable_cache } from "next/cache"
import path from "path"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dpfvicaqf",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export type Category = "wedding" | "portrait" | "civil-ceremony" | "pre-wedding"

export type Photo = {
  id: string
  title: string
  category: Category
  src: string
  portrait: boolean
}

export type PhotoFolder = {
  name: string   // display name, e.g. "Summer 2024"
  slug: string   // Cloudinary subfolder name, used in URL
  category: Category
  photos: Photo[]
}

type CloudinaryResource = {
  public_id: string
  display_name?: string
  width: number
  height: number
}
type CloudinarySubFolder = { name: string; path: string }

function titleFromResource(r: CloudinaryResource): string {
  // Prefer display_name (updated when user renames in Cloudinary UI),
  // fall back to the basename of public_id.
  const raw = r.display_name ?? path.basename(r.public_id)
  return raw
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}

function resourceToPhoto(
  r: CloudinaryResource,
  category: Category,
  index: number
): Photo {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dpfvicaqf"
  return {
    id: `${category[0]}${index + 1}`,
    title: titleFromResource(r),
    category,
    src: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${r.public_id}`,
    portrait: r.height > r.width,
  }
}

async function fetchFolders(category: Category): Promise<PhotoFolder[]> {
  try {
    // Run subfolder list + direct-photo fetch in parallel
    const [{ folders }, directResult] = await Promise.all([
      cloudinary.api.sub_folders(`galleries/${category}`),
      cloudinary.api.resources_by_asset_folder(`galleries/${category}`, {
        resource_type: "image",
        max_results: 500,
        fields: "display_name,width,height,public_id",
      }).catch(() => ({ resources: [] })),
    ])

    // Subfolders → one PhotoFolder each (multiple photos)
    const subfolderFolders = await Promise.all(
      (folders as CloudinarySubFolder[]).map(async (f) => {
        try {
          const result = await cloudinary.api.resources_by_asset_folder(f.path, {
            resource_type: "image",
            max_results: 500,
            fields: "display_name,width,height,public_id",
          })
          const photos = (result.resources as CloudinaryResource[])
            .sort((a, b) => a.public_id.localeCompare(b.public_id))
            .map((r, i) => resourceToPhoto(r, category, i))
          return {
            name: f.name.replace(/[-_]+/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
            slug: f.name,
            category,
            photos,
          } satisfies PhotoFolder
        } catch {
          return null
        }
      })
    )

    // Loose photos directly in galleries/{category} → one PhotoFolder per photo
    const directFolders: PhotoFolder[] = (directResult.resources as CloudinaryResource[])
      .sort((a, b) => a.public_id.localeCompare(b.public_id))
      .map((r, i) => {
        const photo = resourceToPhoto(r, category, i)
        const slug = path.basename(r.public_id)
        return {
          name: slug.replace(/[-_]+/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
          slug,
          category,
          photos: [photo],
        }
      })

    const validSubfolders = subfolderFolders.filter(
      (f): f is PhotoFolder => f !== null && f.photos.length > 0
    )
    return [...validSubfolders, ...directFolders]
  } catch (err) {
    console.error(`Failed to fetch ${category} folders:`, err)
    return []
  }
}

export const getFoldersByCategory = unstable_cache(fetchFolders, ["cloudinary-folders"], {
  tags: ["gallery"],
  revalidate: 60,
})

export async function getAllFolders(): Promise<PhotoFolder[]> {
  const [wedding, portrait, civil, preWedding] = await Promise.all([
    getFoldersByCategory("wedding"),
    getFoldersByCategory("portrait"),
    getFoldersByCategory("civil-ceremony"),
    getFoldersByCategory("pre-wedding"),
  ])
  return [...wedding, ...portrait, ...civil, ...preWedding]
}

export async function getFolderBySlug(
  category: Category,
  slug: string
): Promise<PhotoFolder | undefined> {
  const folders = await getFoldersByCategory(category)
  return folders.find((f) => f.slug === slug)
}
