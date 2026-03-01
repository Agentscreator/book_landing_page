"use client"

import { useEffect, useState } from "react"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-6 pt-20">
      <div className="mx-auto max-w-2xl text-center">
        <p
          className="mb-8 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground transition-all duration-1000 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
          }}
        >
          Nailbook
        </p>
        <h1
          className="font-serif text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-7xl text-balance transition-all duration-1000 ease-out delay-200"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
          }}
        >
          A beautiful custom site to take your business to the next level
        </h1>
        <p
          className="mx-auto mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground transition-all duration-1000 ease-out delay-500"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
          }}
        >
          Custom booking websites for nail technicians.
        </p>
        <div
          className="transition-all duration-1000 ease-out delay-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <a
            href="#interest"
            className="mt-10 inline-flex h-12 items-center border border-foreground bg-transparent px-10 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
          >
            Get Started
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 ease-out delay-1000"
        style={{
          opacity: mounted ? 1 : 0,
        }}
      >
        <div className="h-10 w-px bg-border" />
      </div>
    </section>
  )
}
