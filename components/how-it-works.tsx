"use client"

import { useReveal } from "@/hooks/use-reveal"

const steps = [
  { number: "01", title: "Share your vision" },
  { number: "02", title: "We design & build" },
  { number: "03", title: "Launch" },
]

export function HowItWorks() {
  const { ref, visible } = useReveal(0.2)

  return (
    <section id="process" className="px-6 py-28 md:py-36" ref={ref}>
      <div className="mx-auto max-w-3xl">
        <div className="mb-20 text-center">
          <p
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
            }}
          >
            Process
          </p>
          <h2
            className="font-serif text-3xl tracking-tight text-foreground md:text-4xl transition-all duration-700 ease-out delay-150"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
            }}
          >
            Three simple steps
          </h2>
        </div>

        <div className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex items-center gap-6 border-t border-border py-8 transition-all duration-700 ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${300 + i * 150}ms`,
              }}
            >
              <span className="text-[11px] tracking-[0.2em] text-muted-foreground">
                {step.number}
              </span>
              <h3 className="font-serif text-xl text-foreground md:text-2xl">
                {step.title}
              </h3>
            </div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  )
}
