"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/gallery",          label: "Homepage" },
  { href: "/gallery/wedding",  label: "Wedding"  },
  { href: "/gallery/portrait", label: "Portrait" },
  { href: "/contact",          label: "Contact"  },
]

export default function GallerySidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/gallery") return pathname === "/gallery"
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-black flex flex-col pt-16 pb-10 px-8 z-20">
      <div className="mb-14">
        <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-2">Photography</p>
        <Link href="/gallery" className="text-white text-lg font-light tracking-widest hover:text-white/70 transition-colors">
          STUDIO
        </Link>
      </div>

      <nav className="flex flex-col gap-1">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`py-2.5 text-xs tracking-[0.25em] uppercase transition-colors duration-200 ${
              isActive(href)
                ? "text-white"
                : "text-white/35 hover:text-white/70"
            }`}
          >
            {isActive(href) && (
              <span className="inline-block w-4 h-px bg-white mr-3 mb-0.5 align-middle" />
            )}
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto">
        <p className="text-[10px] text-white/20 tracking-widest">© 2026</p>
      </div>
    </aside>
  )
}
