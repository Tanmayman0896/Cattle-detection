"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Syringe, Salad } from "lucide-react"

function VaccinationReminder() {
  const [breed, setBreed] = useState("")
  const [age, setAge] = useState<number | "">("")
  const [lastDate, setLastDate] = useState("")

  const schedule = useMemo(() => {
    if (!breed || !age || !lastDate) return null
    const dueInDays = Math.max(0, 180 - (Number(age) % 180))
    return {
      nextDue: dueInDays,
      notes: `Based on ${breed} at ${age} months. Consult local guidelines.`,
    }
  }, [breed, age, lastDate])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Syringe className="size-5 text-emerald-600" aria-hidden="true" />
          Vaccination Reminder
        </CardTitle>
        <CardDescription>Generate a suggested vaccination schedule.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="v-breed">Breed</Label>
          <Input id="v-breed" placeholder="e.g., Sahiwal" value={breed} onChange={(e) => setBreed(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="v-age">Age (months)</Label>
          <Input
            id="v-age"
            type="number"
            min={0}
            value={age}
            onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="v-last">Last Vaccination Date</Label>
          <Input id="v-last" type="date" value={lastDate} onChange={(e) => setLastDate(e.target.value)} />
        </div>
        <div className="md:col-span-3">
          <Button disabled={!breed || !age || !lastDate}>Generate Schedule</Button>
        </div>

        <div className="md:col-span-3 grid gap-2">
          <div className="text-xs text-muted-foreground">Next Due</div>
          <div className="font-medium">{schedule ? `${schedule.nextDue} days` : "—"}</div>
          <div className="text-xs text-muted-foreground">Notes</div>
          <div className="font-medium text-pretty">{schedule ? schedule.notes : "—"}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function NutritionCalculator() {
  const [breed, setBreed] = useState("")
  const [age, setAge] = useState<number | "">("")
  const [weight, setWeight] = useState<number | "">("")
  const [milk, setMilk] = useState<number | "">("")

  const plan = useMemo(() => {
    if (!breed || !age || !weight) return null
    const wt = Number(weight)
    const maintenanceFodderKg = Math.max(3, wt * 0.02) // 2% of body weight
    const concentrateKg = milk ? Number(milk) * 0.4 : 1
    const supplements = "Mineral mix 50g, salt 30g"
    return {
      fodder: maintenanceFodderKg.toFixed(1),
      concentrate: concentrateKg.toFixed(1),
      supplements,
      notes: `Auto plan for ${breed}, ${age} mo, ~${wt} kg${milk ? `, ${milk} L/day` : ""}.`,
    }
  }, [breed, age, weight, milk])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Salad className="size-5 text-emerald-600" aria-hidden="true" />
          Nutrition Calculator
        </CardTitle>
        <CardDescription>Get a recommended daily feed plan.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-4">
        <div className="grid gap-2">
          <Label htmlFor="n-breed">Breed</Label>
          <Input id="n-breed" placeholder="e.g., Murrah" value={breed} onChange={(e) => setBreed(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="n-age">Age (months)</Label>
          <Input
            id="n-age"
            type="number"
            min={0}
            value={age}
            onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="n-weight">Weight (kg)</Label>
          <Input
            id="n-weight"
            type="number"
            min={0}
            value={weight}
            onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="n-milk">Milk Yield (L/day)</Label>
          <Input
            id="n-milk"
            type="number"
            min={0}
            value={milk}
            onChange={(e) => setMilk(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Optional"
          />
        </div>

        <div className="md:col-span-4">
          <Button disabled={!breed || !age || !weight}>Get Nutrition Plan</Button>
        </div>

        <div className="md:col-span-4 grid gap-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-md border p-4">
              <div className="text-xs text-muted-foreground mb-1">Fodder (kg/day)</div>
              <div className="font-medium">{plan ? plan.fodder : "—"}</div>
            </div>
            <div className="rounded-md border p-4">
              <div className="text-xs text-muted-foreground mb-1">Concentrate (kg/day)</div>
              <div className="font-medium">{plan ? plan.concentrate : "—"}</div>
            </div>
            <div className="rounded-md border p-4">
              <div className="text-xs text-muted-foreground mb-1">Supplements</div>
              <div className="font-medium">{plan ? plan.supplements : "—"}</div>
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Notes</div>
            <div className="font-medium text-pretty">{plan ? plan.notes : "—"}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EmergencyHelp() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Help</CardTitle>
        <CardDescription>Call the nearest vet for urgent care.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <Button variant="outline" className="flex items-center bg-transparent">
          <Phone className="size-4 mr-2" aria-hidden="true" />
          Call Nearest Vet
        </Button>
      </CardContent>
    </Card>
  )
}

export default function ToolsPage() {
  return (
    <main className="px-4 md:px-6 py-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header>
          <h1 className="text-xl font-semibold">Health Tools</h1>
          <p className="text-sm text-muted-foreground">
            Vaccination reminders, nutrition planning, and emergency assistance.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <VaccinationReminder />
          </div>
          <div>
            <NutritionCalculator />
          </div>
          <div className="md:col-span-2">
            <EmergencyHelp />
          </div>
        </div>
      </div>
    </main>
  )
}
