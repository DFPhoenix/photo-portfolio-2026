import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <main className="relative h-screen w-full overflow-hidden group cursor-default select-none">
      {/* Background photo — zooms in on hover */}
      <div className="absolute inset-0 transition-transform duration-[1200ms] ease-in-out group-hover:scale-110">
        <Image
          src="https://picsum.photos/seed/42/1920/1080"
          alt="hero"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark overlay — slightly lifts on hover */}
      <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors duration-[1200ms]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-8">
        <p className="text-[10px] tracking-[0.5em] uppercase text-white/50 mb-8 font-light">
          Photography Portfolio
        </p>

        <h1 className="text-7xl sm:text-8xl md:text-9xl font-extralight tracking-[0.12em] uppercase mb-6 transition-all duration-700 group-hover:tracking-[0.18em]">
          Studio
        </h1>

        <p className="text-white/40 text-xs tracking-[0.4em] uppercase font-light mb-16">
          Moments &nbsp;·&nbsp; Stories &nbsp;·&nbsp; Light
        </p>

        <Link
          href="/gallery"
          className="text-[11px] tracking-[0.45em] uppercase border border-white/50 px-12 py-4 text-white/70 hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300"
        >
          Explore
        </Link>
      </div>
    </main>
  )
}
