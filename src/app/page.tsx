"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

type Transform = { x: number; y: number; scale: number }

function randomTransform(): Transform {
  return {
    x: (Math.random() - 0.5) * 8,         // ±4% horizontal drift
    y: (Math.random() - 0.5) * 5,         // ±2.5% vertical drift
    scale: 1.1 + Math.random() * 0.08,    // 1.10 – 1.18 scale
  }
}

const IDLE: Transform = { x: 0, y: 0, scale: 1 }

export default function LandingPage() {
  const [hovered, setHovered] = useState(false)
  const [tf, setTf] = useState<Transform>(IDLE)

  useEffect(() => {
    if (!hovered) {
      setTf(IDLE)
      return
    }
    // move immediately, then keep drifting every 2.5s
    setTf(randomTransform())
    const id = setInterval(() => setTf(randomTransform()), 2500)
    return () => clearInterval(id)
  }, [hovered])

  const imgStyle = {
    transform: `scale(${tf.scale}) translate(${tf.x}%, ${tf.y}%)`,
    // transition slightly longer than interval so motion is continuous
    transition: hovered
      ? "transform 3000ms cubic-bezier(0.4, 0, 0.2, 1)"
      : "transform 1400ms cubic-bezier(0.4, 0, 0.2, 1)",
  }

  return (
    <main
      className="relative h-screen w-full overflow-hidden cursor-default select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background photo with flowing drift */}
      <div className="absolute inset-0" style={imgStyle}>
        <Image
          src="/photos/landing-page.jpg"
          alt="landing"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 transition-colors duration-[1200ms]"
        style={{ background: hovered ? "rgba(0,0,0,0.42)" : "rgba(0,0,0,0.56)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center text-center text-white px-8">
        {/* ThereIsAShutter + Photography — centered vertically */}
        <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-extralight uppercase mb-4 transition-all duration-700 leading-tight"
            style={{ letterSpacing: hovered ? "0.18em" : "0.12em" }}
          >
            ThereIsAShutter
          </h1>
          <p className="text-base tracking-[0.5em] uppercase text-white/50 font-light">
            Photography
          </p>
        </div>

        {/* Moments + Explore — at the bottom, original gap preserved between them */}
        <div className="absolute bottom-16 flex flex-col items-center">
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
      </div>
    </main>
  )
}
