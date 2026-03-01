import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { InterestForm } from "@/components/interest-form"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <InterestForm />
      <HowItWorks />
      <Features />
      <Footer />
    </main>
  )
}
