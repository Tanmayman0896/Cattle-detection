"use client"

import type React from "react"
import { useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Stethoscope, Pill, Scan } from "lucide-react"

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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="w-full px-4 md:px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600 p-2 text-white shadow-lg">
              <Camera className="size-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Cattle Detection
              </h1>
              <p className="text-sm text-gray-600">Upload and analyze your cattle photos</p>
            </div>
          </div>
          <Button variant="outline" asChild className="rounded-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      <div className="px-4 md:px-6 py-8">
        <div className="mx-auto max-w-6xl space-y-8">
          
          {/* Upload Card */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2" />
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Camera className="size-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-900">Upload Cattle Photo</CardTitle>
                  <CardDescription className="text-gray-600">
                    Drag and drop your image or click to browse files
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
              
              <div
                role="button"
                tabIndex={0}
                onClick={onPick}
                onKeyDown={(e) => (e.key === "Enter" ? onPick() : null)}
                className="relative border-2 border-dashed border-blue-300 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition-all duration-300 group"
                aria-label="Drop image here or click to upload"
              >
                {preview ? (
                  <div className="w-full max-w-md">
                    <div className="relative w-full overflow-hidden rounded-xl border-4 border-white shadow-2xl">
                      <img
                        src={preview}
                        alt="Selected cattle photo preview"
                        className="w-full h-auto max-h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <p className="mt-4 text-sm font-medium text-gray-700">
                      Photo uploaded successfully! Click "Analyze Now" to continue.
                    </p>
                  </div>
                ) : (
                  <div className="group-hover:scale-105 transition-transform duration-300">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <Camera className="size-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your Photo</h3>
                    <p className="text-gray-600 max-w-sm">
                      Support JPG, PNG files up to 10MB. For best results, ensure good lighting and clear view of the cattle.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
                  onClick={onDetect} 
                  disabled={!preview || loading}
                  size="lg"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Scan className="size-5 mr-2" />
                      Analyze Now
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPreview(null)
                    setResult(null)
                  }}
                  className="rounded-full px-6"
                >
                  Clear Photo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2" />
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Stethoscope className="size-6 text-emerald-600" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-900">Analysis Results</CardTitle>
                  <CardDescription className="text-gray-600">
                    AI-powered insights about your cattle
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <Scan className="size-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Breed</h3>
                  </div>
                  <p className="text-lg font-bold text-blue-700">{result?.breed ?? "—"}</p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-xl p-6 border border-emerald-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-emerald-600 rounded-lg">
                      <Stethoscope className="size-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Health Status</h3>
                  </div>
                  <p className="text-lg font-bold text-emerald-700">{result?.diseaseStatus ?? "—"}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-6 border border-purple-200 md:col-span-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-600 rounded-lg">
                      <Pill className="size-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Care Recommendation</h3>
                  </div>
                  <p className="text-sm font-medium text-purple-700 leading-relaxed">
                    {result?.careSuggestion ?? "Upload and analyze a photo to get personalized care recommendations"}
                  </p>
                </div>
              </div>

              {result && (
                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
                  <Button variant="outline" className="rounded-full flex items-center gap-2 hover:bg-purple-50 hover:border-purple-300">
                    <Pill className="size-4" />
                    View Medication Guide
                  </Button>
                  <Button variant="outline" className="rounded-full flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300">
                    <Stethoscope className="size-4" />
                    Find Nearby Vet
                  </Button>
                  <Button variant="outline" className="rounded-full flex items-center gap-2 hover:bg-emerald-50 hover:border-emerald-300">
                    <Camera className="size-4" />
                    Analyze Another Photo
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
