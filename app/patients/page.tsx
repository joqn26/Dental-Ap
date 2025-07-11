"use client"
import { Users, Plus, Search, Filter, Edit, Trash2, Eye, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PatientsPage() {
  const patients = [
    {
      id: 1,
      name: "María García",
      email: "maria.garcia@email.com",
      phone: "+34 666 123 456",
      address: "Calle Mayor 123, Madrid",
      birthDate: "1985-03-15",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-01-20",
      status: "activo",
      treatments: ["Limpieza", "Ortodoncia"],
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 2,
      name: "Carlos López",
      email: "carlos.lopez@email.com",
      phone: "+34 666 789 012",
      address: "Avenida Libertad 45, Barcelona",
      birthDate: "1978-07-22",
      lastVisit: "2024-01-08",
      nextAppointment: "2024-01-18",
      status: "activo",
      treatments: ["Extracción", "Implante"],
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 3,
      name: "Ana Martínez",
      email: "ana.martinez@email.com",
      phone: "+34 666 345 678",
      address: "Plaza España 67, Valencia",
      birthDate: "1992-11-08",
      lastVisit: "2024-01-05",
      nextAppointment: null,
      status: "inactivo",
      treatments: ["Ortodoncia"],
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 4,
      name: "Pedro Rodríguez",
      email: "pedro.rodriguez@email.com",
      phone: "+34 666 901 234",
      address: "Calle Sol 89, Sevilla",
      birthDate: "1965-12-03",
      lastVisit: "2024-01-12",
      nextAppointment: "2024-01-25",
      status: "activo",
      treatments: ["Endodoncia", "Corona"],
      avatar: "/placeholder-user.jpg",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activo":
        return "bg-green-100 text-green-800"
      case "inactivo":
        return "bg-gray-100 text-gray-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
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
            <Users className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="/appointments" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Users className="w-5 h-5 mr-3" />
            Citas
          </Link>
          <Link
            href="/patients"
            className="flex items-center px-6 py-3 text-blue-600 bg-blue-50 border-r-2 border-blue-600"
          >
            <Users className="w-5 h-5 mr-3" />
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
              <h2 className="text-2xl font-semibold text-gray-800">Gestión de Pacientes</h2>
              <p className="text-gray-600">Administra la información de todos los pacientes</p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Paciente
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Registrar Nuevo Paciente</DialogTitle>
                  <DialogDescription>Completa los datos del nuevo paciente.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" placeholder="Nombre" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Apellidos</Label>
                      <Input id="lastName" placeholder="Apellidos" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@ejemplo.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" placeholder="+34 666 123 456" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                      <Input id="birthDate" type="date" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" placeholder="Dirección completa" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="insurance">Seguro Médico</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar seguro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sanitas">Sanitas</SelectItem>
                        <SelectItem value="adeslas">Adeslas</SelectItem>
                        <SelectItem value="mapfre">Mapfre</SelectItem>
                        <SelectItem value="ninguno">Sin seguro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Registrar Paciente</Button>
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

            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="activo">Activos</SelectItem>
                <SelectItem value="inactivo">Inactivos</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Patients Grid */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                        <AvatarFallback>
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{patient.name}</CardTitle>
                        <CardDescription>{calculateAge(patient.birthDate)} años</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {patient.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {patient.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {patient.address}
                  </div>

                  <div className="pt-2">
                    <p className="text-sm font-medium mb-1">Tratamientos:</p>
                    <div className="flex flex-wrap gap-1">
                      {patient.treatments.map((treatment, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {treatment}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 text-sm">
                    <p>
                      <span className="font-medium">Última visita:</span>{" "}
                      {new Date(patient.lastVisit).toLocaleDateString("es-ES")}
                    </p>
                    {patient.nextAppointment && (
                      <p>
                        <span className="font-medium">Próxima cita:</span>{" "}
                        {new Date(patient.nextAppointment).toLocaleDateString("es-ES")}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 pt-3">
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
