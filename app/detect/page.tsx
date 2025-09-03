"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Stethoscope, Pill } from "lucide-react"

type Result = {
  breed: string
  diseaseStatus: string
  careSuggestion: string
}

export default function DetectPage() {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)

  function onPick() {
    fileRef.current?.click()
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    setPreview(url)
    setResult(null)
  }

  async function onDetect() {
    setLoading(true)
    setTimeout(() => {
      setResult({
        breed: "Gir (Example)",
        diseaseStatus: "Healthy",
        careSuggestion:
          "Maintain a balanced diet with minerals. Monitor temperature weekly and ensure clean water access.",
      })
      setLoading(false)
    }, 800)
  }

  return (
    <main className="px-4 md:px-6 py-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex items-center gap-2">
          <div className="rounded-md bg-emerald-600 p-1.5 text-white" aria-hidden="true">
            <Camera className="size-4" />
          </div>
          <h1 className="text-xl font-semibold">Upload Your Cattle Photo</h1>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Photo</CardTitle>
            <CardDescription>Drop image here or click to upload</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
            <div
              role="button"
              tabIndex={0}
              onClick={onPick}
              onKeyDown={(e) => (e.key === "Enter" ? onPick() : null)}
              className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-3 text-center hover:bg-muted/50 cursor-pointer"
              aria-label="Drop image here or click to upload"
            >
              {preview ? (
                <div className="w-full max-w-sm">
                  <div className="relative w-full overflow-hidden rounded-md border">
                    {/* Using native img to ensure blob: urls preview reliably */}
                    <img
                      src={preview || "/placeholder.svg?height=300&width=400&query=Cattle%20photo%20placeholder"}
                      alt="Selected cattle photo preview"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <Camera className="size-6 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">Drop image here or click to upload</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={onDetect} disabled={!preview || loading}>
                {loading ? "Detecting..." : "Detect Now"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setPreview(null)
                  setResult(null)
                }}
              >
                Choose File
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card aria-live="polite">
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription>AI analysis for breed and health</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-md border p-4">
              <div className="text-xs text-muted-foreground mb-1">Breed</div>
              <div className="font-medium">{result?.breed ?? "—"}</div>
            </div>
            <div className="rounded-md border p-4">
              <div className="text-xs text-muted-foreground mb-1">Disease Status</div>
              <div className="font-medium">{result?.diseaseStatus ?? "—"}</div>
            </div>
            <div className="rounded-md border p-4 sm:col-span-2 md:col-span-1">
              <div className="text-xs text-muted-foreground mb-1">Care Suggestion</div>
              <div className="font-medium text-pretty">{result?.careSuggestion ?? "—"}</div>
            </div>

            <div className="flex items-center gap-3 md:col-span-3">
              <Button variant="outline">
                <Pill className="size-4 mr-2" aria-hidden="true" />
                View Medication Guide
              </Button>
              <Button variant="outline">
                <Stethoscope className="size-4 mr-2" aria-hidden="true" />
                Find Nearby Vet
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
