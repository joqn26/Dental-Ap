@extends('layouts.app')

@section('title', 'Dashboard')
@section('subtitle', ucfirst(\Carbon\Carbon::now()->locale('es')->isoFormat('dddd, D [de] MMMM [de] YYYY')))

@section('content')
<!-- Stats Cards -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    <div class="bg-white rounded-lg border shadow-sm p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-gray-600">Citas Hoy</p>
                <p class="text-2xl font-bold text-gray-900">{{ $stats['appointments_today'] }}</p>
                <p class="text-xs text-gray-500">+2 desde ayer</p>
            </div>
            <div class="p-3 bg-blue-50 rounded-full">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-lg border shadow-sm p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-gray-600">Pacientes Activos</p>
                <p class="text-2xl font-bold text-gray-900">{{ $stats['active_patients'] }}</p>
                <p class="text-xs text-gray-500">+12 este mes</p>
            </div>
            <div class="p-3 bg-green-50 rounded-full">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-lg border shadow-sm p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-gray-600">Ingresos Mes</p>
                <p class="text-2xl font-bold text-gray-900">${{ number_format($stats['monthly_revenue'], 0) }}</p>
                <p class="text-xs text-gray-500">+8% vs mes anterior</p>
            </div>
            <div class="p-3 bg-yellow-50 rounded-full">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-lg border shadow-sm p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-gray-600">Próxima Cita</p>
                <p class="text-2xl font-bold text-gray-900">
                    {{ $stats['next_appointment'] ? $stats['next_appointment']->appointment_time->format('H:i') : '--:--' }}
                </p>
                <p class="text-xs text-gray-500">
                    {{ $stats['next_appointment'] ? $stats['next_appointment']->patient->full_name : 'Sin citas' }}
                </p>
            </div>
            <div class="p-3 bg-purple-50 rounded-full">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
        </div>
    </div>
</div>

<!-- Today's Appointments -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="bg-white rounded-lg border shadow-sm">
        <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="text-lg font-semibold text-gray-900">Citas de Hoy</h3>
                    <p class="text-sm text-gray-500">Agenda del día actual</p>
                </div>
                <a href="{{ route('appointments.create') }}" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Nueva Cita
                </a>
            </div>
        </div>
        <div class="p-6">
            <div class="space-y-4">
                @forelse($todayAppointments as $appointment)
                    <div class="flex items-center justify-between p-3 border rounded-lg">
                        <div class="flex items-center space-x-3">
                            <div class="text-sm font-medium text-blue-600">
                                {{ $appointment->appointment_time->format('H:i') }}
                            </div>
                            <div>
                                <p class="font-medium">{{ $appointment->patient->full_name }}</p>
                                <p class="text-sm text-gray-500">{{ $appointment->treatment->name }}</p>
                            </div>
                        </div>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            @if($appointment->status === 'confirmed') bg-green-100 text-green-800
                            @elseif($appointment->status === 'pending') bg-yellow-100 text-yellow-800
                            @elseif($appointment->status === 'completed') bg-blue-100 text-blue-800
                            @else bg-red-100 text-red-800
                            @endif">
                            {{ ucfirst($appointment->status) }}
                        </span>
                    </div>
                @empty
                    <p class="text-gray-500 text-center py-8">No hay citas programadas para hoy</p>
                @endforelse
            </div>
        </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg border shadow-sm">
        <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Acciones Rápidas</h3>
            <p class="text-sm text-gray-500">Funciones más utilizadas</p>
        </div>
        <div class="p-6">
            <div class="grid grid-cols-2 gap-4">
                <a href="{{ route('appointments.create') }}" class="flex flex-col items-center justify-center h-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors">
                    <svg class="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span class="text-sm font-medium text-gray-600">Nueva Cita</span>
                </a>
                <a href="{{ route('patients.create') }}" class="flex flex-col items-center justify-center h-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors">
                    <svg class="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                    </svg>
                    <span class="text-sm font-medium text-gray-600">Nuevo Paciente</span>
                </a>
                <a href="{{ route('appointments.index') }}" class="flex flex-col items-center justify-center h-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors">
                    <svg class="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span class="text-sm font-medium text-gray-600">Ver Calendario</span>
                </a>
                <a href="{{ route('patients.index') }}" class="flex flex-col items-center justify-center h-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors">
                    <svg class="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-sm font-medium text-gray-600">Horarios</span>
                </a>
            </div>
        </div>
    </div>
</div>
@endsection
