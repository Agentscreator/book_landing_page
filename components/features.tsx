"use client"

import { useReveal } from "@/hooks/use-reveal"

const features = [
  { title: "Seamless Booking", detail: "Clients pick a time, book instantly." },
  { title: "Mobile-First", detail: "Built for how your clients browse." },
  { title: "Fully Branded", detail: "Your colors, your fonts, your identity." },
  { title: "Custom Domain", detail: "A professional URL that builds trust." },
]

export function Features() {
  const { ref, visible } = useReveal(0.2)

  return (
    <section id="features" className="bg-primary px-6 py-28 md:py-36" ref={ref}>
      <div className="mx-auto max-w-3xl">
        <p
          className="mb-4 text-center text-[11px] font-medium uppercase tracking-[0.3em] text-primary-foreground/40 transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
          }}
        >
          Features
        </p>
        <h2
          className="mb-20 text-center font-serif text-3xl tracking-tight text-primary-foreground md:text-4xl transition-all duration-700 ease-out delay-150"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
          }}
        >
          Everything you need
        </h2>

        <div className="grid grid-cols-1 gap-px bg-primary-foreground/10 sm:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="bg-primary p-8 md:p-10 transition-all duration-700 ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${300 + i * 120}ms`,
              }}
            >
              <h3 className="font-serif text-lg text-primary-foreground md:text-xl">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/50">
                {f.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
