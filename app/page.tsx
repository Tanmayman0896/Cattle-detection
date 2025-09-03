"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Camera, Scan, Stethoscope, Leaf, MapPin } from "lucide-react"

function Hero() {
  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto max-w-3xl text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-balance">
          Smart AI for Cattle Health & Breed Detection
        </h1>
        <p className="text-muted-foreground text-pretty">
          Upload a photo of your cattle and instantly detect breed, diseases, and get expert care suggestions.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button asChild className="bg-primary hover:bg-primary/80">
            <Link href="/detect">Upload Photo</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/detect">Detect Now</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function FeatureCards() {
  const features = [
    {
      title: "Breed Recognition",
      description: "Identify cattle & buffalo breeds instantly.",
      icon: Scan,
      href: "/detect",
    },
    {
      title: "Disease Detection",
      description: "AI-powered health check for your animals.",
      icon: Stethoscope,
      href: "/detect",
    },
    {
      title: "Feed & Nutrition",
      description: "Personalized diet and cost-effective feed plans.",
      icon: Leaf,
      href: "/tools",
    },
    {
      title: "Find Nearby Vet",
      description: "Locate veterinary help when you need it most.",
      icon: MapPin,
      href: "/tools",
    },
  ]

  return (
    <section className="py-4 md:py-6">
      <div className="mx-auto max-w-5xl grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <Link
            key={f.title}
            href={f.href}
            aria-label={`${f.title} - Learn more`}
            className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
          >
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-md bg-primary/10 p-2 text-primary" aria-hidden="true">
                  <f.icon className="size-5" />
                </div>
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription>{f.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main className="px-4 md:px-6">
      <header className="mx-auto max-w-6xl px-1 py-3 md:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-md bg-primary p-1.5 text-primary-foreground" aria-hidden="true">
            <Camera className="size-4" />
          </div>
          <span className="font-medium">CattleCare AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/detect" className="text-sm text-muted-foreground hover:text-foreground">
            Detect
          </Link>
          <Link href="/tools" className="text-sm text-muted-foreground hover:text-foreground">
            Health Tools
          </Link>
        </nav>
        <div className="md:hidden" />
      </header>

      <div className="mx-auto max-w-6xl">
        <Hero />
        <FeatureCards />
      </div>
    </main>
  )
}
