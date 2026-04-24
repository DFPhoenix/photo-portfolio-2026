import GallerySidebar from "@/app/_components/GallerySidebar"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-950">
      <GallerySidebar />
      <main className="flex-1 ml-56 min-h-screen">{children}</main>
    </div>
  )
}
