import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret")
  if (!secret || secret !== process.env.CLOUDINARY_WEBHOOK_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const publicId: string = body.public_id ?? ""

  // Invalidate the data cache (unstable_cache tagged "gallery")
  revalidateTag("gallery", "max")

  // Revalidate the specific gallery page based on which folder changed
  if (publicId.includes("wedding")) {
    revalidatePath("/gallery/wedding")
  } else if (publicId.includes("portrait")) {
    revalidatePath("/gallery/portrait")
  }
  // Always revalidate the homepage (shows all photos)
  revalidatePath("/gallery")

  return Response.json({ revalidated: true, folder: publicId })
}
