"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handle, { passive: true })
    return () => window.removeEventListener("scroll", handle)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled
          ? "var(--background)"
          : "transparent",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <a
          href="#"
          className="font-serif text-lg tracking-tight text-foreground"
        >
          Nailbook
        </a>

        <ul className="hidden items-center gap-8 sm:flex">
          <li>
            <a
              href="#process"
              className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              Process
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#interest"
              className="text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors duration-300 hover:text-muted-foreground"
            >
              Inquire
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="text-foreground sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-6 pb-8 pt-6 sm:hidden">
          <ul className="flex flex-col gap-5">
            <li>
              <a
                href="#process"
                onClick={() => setOpen(false)}
                className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                Process
              </a>
            </li>
            <li>
              <a
                href="#features"
                onClick={() => setOpen(false)}
                className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#interest"
                onClick={() => setOpen(false)}
                className="text-[11px] uppercase tracking-[0.2em] text-foreground"
              >
                Inquire
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
