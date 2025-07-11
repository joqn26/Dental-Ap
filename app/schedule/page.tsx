"use client"

import { useState } from "react"
import { Calendar, Clock, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"week" | "day">("week")

  // Generar días de la semana
  const getWeekDays = (date: Date) => {
    const week = []
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1) // Lunes como primer día
    startOfWeek.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day)
    }
    return week
  }

  const weekDays = getWeekDays(currentDate)
  const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8:00 a 19:00

  // Citas de ejemplo
  const appointments = [
    {
      id: 1,
      date: new Date(2024, 0, 15),
      startTime: 9,
      duration: 1,
      patient: "María García",
      treatment: "Limpieza",
      doctor: "Dr. Smith",
    },
    {
      id: 2,
      date: new Date(2024, 0, 15),
      startTime: 10.5,
      duration: 1.5,
      patient: "Carlos López",
      treatment: "Extracción",
      doctor: "Dr. Johnson",
    },
    {
      id: 3,
      date: new Date(2024, 0, 16),
      startTime: 14,
      duration: 1,
      patient: "Ana Martínez",
      treatment: "Ortodoncia",
      doctor: "Dr. Smith",
    },
  ]

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7))
    setCurrentDate(newDate)
  }

  const formatTime = (hour: number) => {
    const wholeHour = Math.floor(hour)
    const minutes = (hour % 1) * 60
    return `${wholeHour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
  }

  const getAppointmentForSlot = (date: Date, hour: number) => {
    return appointments.find(
      (apt) =>
        apt.date.toDateString() === date.toDateString() && apt.startTime <= hour && apt.startTime + apt.duration > hour,
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold text-blue-600">DentalCare</h1>
          <p className="text-sm text-gray-500">Sistema de Gestión</p>
        </div>

        <nav className="mt-6">
          <Link href="/" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Calendar className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="/appointments" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Calendar className="w-5 h-5 mr-3" />
            Citas
          </Link>
          <Link href="/patients" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Calendar className="w-5 h-5 mr-3" />
            Pacientes
          </Link>
          <Link
            href="/schedule"
            className="flex items-center px-6 py-3 text-blue-600 bg-blue-50 border-r-2 border-blue-600"
          >
            <Clock className="w-5 h-5 mr-3" />
            Horarios
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Calendario de Citas</h2>
              <p className="text-gray-600">Vista semanal del horario del consultorio</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "week" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("week")}
                >
                  Semana
                </Button>
                <Button
                  variant={viewMode === "day" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("day")}
                >
                  Día
                </Button>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Cita
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agendar Nueva Cita</DialogTitle>
                    <DialogDescription>Selecciona el horario y completa los datos.</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button type="submit">Agendar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        {/* Calendar Navigation */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={() => navigateWeek("prev")}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h3 className="text-lg font-semibold">
                {weekDays[0].toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
              </h3>
              <Button variant="outline" size="icon" onClick={() => navigateWeek("next")}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
              Hoy
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <main className="flex-1 p-6 overflow-auto">
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-8 border-b">
                <div className="p-4 border-r bg-gray-50">
                  <span className="text-sm font-medium text-gray-500">Hora</span>
                </div>
                {weekDays.map((day, index) => (
                  <div key={index} className="p-4 border-r last:border-r-0 bg-gray-50">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">
                        {day.toLocaleDateString("es-ES", { weekday: "short" })}
                      </div>
                      <div
                        className={`text-lg font-semibold mt-1 ${
                          day.toDateString() === new Date().toDateString() ? "text-blue-600" : "text-gray-700"
                        }`}
                      >
                        {day.getDate()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-8 border-b last:border-b-0 min-h-[80px]">
                  <div className="p-4 border-r bg-gray-50 flex items-start">
                    <span className="text-sm font-medium text-gray-500">{formatTime(hour)}</span>
                  </div>
                  {weekDays.map((day, dayIndex) => {
                    const appointment = getAppointmentForSlot(day, hour)
                    return (
                      <div key={dayIndex} className="border-r last:border-r-0 p-2 relative">
                        {appointment && (
                          <div className="bg-blue-100 border border-blue-200 rounded p-2 text-xs">
                            <div className="font-medium text-blue-800">{appointment.patient}</div>
                            <div className="text-blue-600">{appointment.treatment}</div>
                            <div className="text-blue-500">{appointment.doctor}</div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
