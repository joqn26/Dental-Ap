"use client"

import { useState } from "react"
import { Calendar, Users, Clock, TrendingUp, Plus, Search, Bell, Settings, User, LogOut } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Dashboard() {
  const [currentDate] = useState(
    new Date().toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  )

  const todayAppointments = [
    { id: 1, time: "09:00", patient: "María García", treatment: "Limpieza dental", status: "confirmada" },
    { id: 2, time: "10:30", patient: "Carlos López", treatment: "Extracción", status: "pendiente" },
    { id: 3, time: "11:45", patient: "Ana Martínez", treatment: "Ortodoncia", status: "confirmada" },
    { id: 4, time: "14:00", patient: "Pedro Rodríguez", treatment: "Endodoncia", status: "en-proceso" },
    { id: 5, time: "15:30", patient: "Laura Sánchez", treatment: "Implante", status: "confirmada" },
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
          <Link href="/" className="flex items-center px-6 py-3 text-blue-600 bg-blue-50 border-r-2 border-blue-600">
            <TrendingUp className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="/appointments" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Calendar className="w-5 h-5 mr-3" />
            Citas
          </Link>
          <Link href="/patients" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Users className="w-5 h-5 mr-3" />
            Pacientes
          </Link>
          <Link href="/schedule" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Clock className="w-5 h-5 mr-3" />
            Horarios
          </Link>
          <Link href="/settings" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Settings className="w-5 h-5 mr-3" />
            Configuración
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
              <p className="text-gray-600 capitalize">{currentDate}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Buscar paciente..." className="pl-10 w-64" />
              </div>

              <Button size="icon" variant="outline">
                <Bell className="w-4 h-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt="Dr. Smith" />
                      <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Dr. Smith</p>
                      <p className="text-xs leading-none text-muted-foreground">doctor@dentalcare.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 desde ayer</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pacientes Activos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-muted-foreground">+12 este mes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingresos Mes</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$15,240</div>
                <p className="text-xs text-muted-foreground">+8% vs mes anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Próxima Cita</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">09:00</div>
                <p className="text-xs text-muted-foreground">María García</p>
              </CardContent>
            </Card>
          </div>

          {/* Today's Appointments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Citas de Hoy</CardTitle>
                  <CardDescription>Agenda del día actual</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Cita
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-medium text-blue-600">{appointment.time}</div>
                        <div>
                          <p className="font-medium">{appointment.patient}</p>
                          <p className="text-sm text-gray-500">{appointment.treatment}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>Funciones más utilizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-20 flex flex-col gap-2 bg-transparent" variant="outline">
                    <Plus className="w-6 h-6" />
                    Nueva Cita
                  </Button>
                  <Button className="h-20 flex flex-col gap-2 bg-transparent" variant="outline">
                    <Users className="w-6 h-6" />
                    Nuevo Paciente
                  </Button>
                  <Button className="h-20 flex flex-col gap-2 bg-transparent" variant="outline">
                    <Calendar className="w-6 h-6" />
                    Ver Calendario
                  </Button>
                  <Button className="h-20 flex flex-col gap-2 bg-transparent" variant="outline">
                    <Clock className="w-6 h-6" />
                    Horarios
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
