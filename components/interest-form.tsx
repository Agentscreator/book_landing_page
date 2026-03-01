"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2 } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"

export function InterestForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const { ref, visible } = useReveal(0.15)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      instagram: formData.get("instagram") as string,
      message: formData.get("message") as string,
    }

    // TODO: Replace with your database save logic
    console.log("Interest form submission:", data)
    await new Promise((resolve) => setTimeout(resolve, 800))

    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="interest" className="px-6 py-28 md:py-36">
        <div className="mx-auto max-w-md text-center">
          <CheckCircle2 className="mx-auto mb-6 size-8 text-foreground" strokeWidth={1} />
          <h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
            {"We'll be in touch"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Thank you for your interest.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="interest" className="px-6 py-28 md:py-36" ref={ref}>
      <div className="mx-auto max-w-md">
        <div className="mb-14 text-center">
          <p
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
            }}
          >
            Interest Form
          </p>
          <h2
            className="font-serif text-3xl tracking-tight text-foreground md:text-4xl transition-all duration-700 ease-out delay-150"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
            }}
          >
            Inquire
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 transition-all duration-700 ease-out delay-300"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="name"
              className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              required
              className="h-12 rounded-none border-x-0 border-t-0 border-b border-border bg-transparent px-0 text-sm text-foreground shadow-none placeholder:text-muted-foreground/40 focus-visible:ring-0 focus-visible:border-foreground transition-colors duration-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="email"
              className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@email.com"
              required
              className="h-12 rounded-none border-x-0 border-t-0 border-b border-border bg-transparent px-0 text-sm text-foreground shadow-none placeholder:text-muted-foreground/40 focus-visible:ring-0 focus-visible:border-foreground transition-colors duration-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="instagram"
              className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              Instagram
            </Label>
            <Input
              id="instagram"
              name="instagram"
              placeholder="@handle"
              className="h-12 rounded-none border-x-0 border-t-0 border-b border-border bg-transparent px-0 text-sm text-foreground shadow-none placeholder:text-muted-foreground/40 focus-visible:ring-0 focus-visible:border-foreground transition-colors duration-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="message"
              className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your business..."
              rows={3}
              className="resize-none rounded-none border-x-0 border-t-0 border-b border-border bg-transparent px-0 text-sm text-foreground shadow-none placeholder:text-muted-foreground/40 focus-visible:ring-0 focus-visible:border-foreground transition-colors duration-300"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 flex h-12 w-full items-center justify-center border border-foreground bg-transparent text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:bg-foreground hover:text-background disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
