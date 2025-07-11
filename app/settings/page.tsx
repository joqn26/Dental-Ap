"use client"

import { Settings, User, Clock, Bell, Shield, Database } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
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
            <Settings className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="/appointments" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Settings className="w-5 h-5 mr-3" />
            Citas
          </Link>
          <Link href="/patients" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Settings className="w-5 h-5 mr-3" />
            Pacientes
          </Link>
          <Link
            href="/settings"
            className="flex items-center px-6 py-3 text-blue-600 bg-blue-50 border-r-2 border-blue-600"
          >
            <Settings className="w-5 h-5 mr-3" />
            Configuración
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Configuración</h2>
            <p className="text-gray-600">Administra la configuración del sistema</p>
          </div>
        </header>

        {/* Settings Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Perfil del Consultorio */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Información del Consultorio
              </CardTitle>
              <CardDescription>Configura los datos básicos de tu consultorio dental</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clinicName">Nombre del Consultorio</Label>
                  <Input id="clinicName" defaultValue="Clínica Dental DentalCare" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinicPhone">Teléfono</Label>
                  <Input id="clinicPhone" defaultValue="+34 91 123 45 67" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinicAddress">Dirección</Label>
                <Input id="clinicAddress" defaultValue="Calle Mayor 123, 28001 Madrid" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clinicEmail">Email</Label>
                  <Input id="clinicEmail" type="email" defaultValue="info@dentalcare.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinicWebsite">Sitio Web</Label>
                  <Input id="clinicWebsite" defaultValue="www.dentalcare.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinicDescription">Descripción</Label>
                <Textarea
                  id="clinicDescription"
                  defaultValue="Clínica dental especializada en tratamientos integrales con más de 15 años de experiencia."
                  rows={3}
                />
              </div>

              <Button>Guardar Cambios</Button>
            </CardContent>
          </Card>

          {/* Horarios de Trabajo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Horarios de Trabajo
              </CardTitle>
              <CardDescription>Define los horarios de atención del consultorio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
                <div key={day} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Switch defaultChecked={day !== "Domingo"} />
                    <span className="font-medium w-20">{day}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input type="time" defaultValue="09:00" className="w-24" />
                    <span>-</span>
                    <Input type="time" defaultValue="18:00" className="w-24" />
                  </div>
                </div>
              ))}
              <Button>Actualizar Horarios</Button>
            </CardContent>
          </Card>

          {/* Notificaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notificaciones
              </CardTitle>
              <CardDescription>Configura las notificaciones del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Recordatorios de Citas</Label>
                  <p className="text-sm text-gray-500">Enviar recordatorios automáticos a los pacientes</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones por Email</Label>
                  <p className="text-sm text-gray-500">Recibir notificaciones por correo electrónico</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones SMS</Label>
                  <p className="text-sm text-gray-500">Enviar recordatorios por SMS</p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminderTime">Tiempo de Recordatorio</Label>
                <Select defaultValue="24">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hora antes</SelectItem>
                    <SelectItem value="2">2 horas antes</SelectItem>
                    <SelectItem value="24">24 horas antes</SelectItem>
                    <SelectItem value="48">48 horas antes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button>Guardar Configuración</Button>
            </CardContent>
          </Card>

          {/* Seguridad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Seguridad
              </CardTitle>
              <CardDescription>Configuración de seguridad y acceso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Contraseña Actual</Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input id="newPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input id="confirmPassword" type="password" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autenticación de Dos Factores</Label>
                  <p className="text-sm text-gray-500">Añade una capa extra de seguridad</p>
                </div>
                <Switch />
              </div>

              <Button>Actualizar Contraseña</Button>
            </CardContent>
          </Card>

          {/* Respaldo de Datos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Respaldo de Datos
              </CardTitle>
              <CardDescription>Gestiona las copias de seguridad de tu información</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Respaldo Automático</Label>
                  <p className="text-sm text-gray-500">Crear copias de seguridad automáticamente</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Frecuencia de Respaldo</Label>
                <Select defaultValue="daily">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diario</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button>Crear Respaldo Ahora</Button>
                <Button variant="outline">Restaurar Datos</Button>
              </div>

              <div className="text-sm text-gray-500">
                <p>Último respaldo: 15 de enero, 2024 - 02:30 AM</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
