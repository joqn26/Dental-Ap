"use client"

import { useState } from "react"
import { Calendar, Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const appointments = [
    {
      id: 1,
      date: "2024-01-15",
      time: "09:00",
      patient: "María García",
      phone: "+34 666 123 456",
      treatment: "Limpieza dental",
      doctor: "Dr. Smith",
      status: "confirmada",
      notes: "Primera visita del año",
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "10:30",
      patient: "Carlos López",
      phone: "+34 666 789 012",
      treatment: "Extracción muela del juicio",
      doctor: "Dr. Johnson",
      status: "pendiente",
      notes: "Paciente nervioso, necesita sedación",
    },
    {
      id: 3,
      date: "2024-01-15",
      time: "11:45",
      patient: "Ana Martínez",
      phone: "+34 666 345 678",
      treatment: "Revisión ortodoncia",
      doctor: "Dr. Smith",
      status: "confirmada",
      notes: "Ajuste de brackets",
    },
    {
      id: 4,
      date: "2024-01-16",
      time: "14:00",
      patient: "Pedro Rodríguez",
      phone: "+34 666 901 234",
      treatment: "Endodoncia",
      doctor: "Dr. Johnson",
      status: "en-proceso",
      notes: "Segunda sesión",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada":
        return "bg-green-100 text-green-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "en-proceso":
        return "bg-blue-100 text-blue-800"
      case "cancelada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
          <Link
            href="/appointments"
            className="flex items-center px-6 py-3 text-blue-600 bg-blue-50 border-r-2 border-blue-600"
          >
            <Calendar className="w-5 h-5 mr-3" />
            Citas
          </Link>
          <Link href="/patients" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Calendar className="w-5 h-5 mr-3" />
            Pacientes
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Gestión de Citas</h2>
              <p className="text-gray-600">Administra todas las citas del consultorio</p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Cita
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Agendar Nueva Cita</DialogTitle>
                  <DialogDescription>Completa los datos para agendar una nueva cita.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="patient" className="text-right">
                      Paciente
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Seleccionar paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maria">María García</SelectItem>
                        <SelectItem value="carlos">Carlos López</SelectItem>
                        <SelectItem value="ana">Ana Martínez</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Fecha
                    </Label>
                    <Input id="date" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                      Hora
                    </Label>
                    <Input id="time" type="time" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="treatment" className="text-right">
                      Tratamiento
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Tipo de tratamiento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="limpieza">Limpieza dental</SelectItem>
                        <SelectItem value="extraccion">Extracción</SelectItem>
                        <SelectItem value="endodoncia">Endodoncia</SelectItem>
                        <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">
                      Notas
                    </Label>
                    <Textarea id="notes" placeholder="Notas adicionales..." className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Agendar Cita</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Buscar paciente..." className="pl-10" />
            </div>

            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-40"
            />

            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="confirmada">Confirmada</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="en-proceso">En proceso</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Appointments Table */}
        <main className="flex-1 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Citas</CardTitle>
              <CardDescription>Todas las citas programadas en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Tratamiento</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{new Date(appointment.date).toLocaleDateString("es-ES")}</TableCell>
                      <TableCell className="font-medium">{appointment.time}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{appointment.patient}</p>
                          <p className="text-sm text-gray-500">{appointment.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{appointment.treatment}</TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
