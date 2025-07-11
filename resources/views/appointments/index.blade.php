@extends('layouts.app')

@section('title', 'Gestión de Citas')
@section('subtitle', 'Administra todas las citas del consultorio')

@section('content')
<!-- Filters -->
<div class="bg-white border-b px-6 py-4 mb-6 rounded-lg shadow-sm">
    <form method="GET" action="{{ route('appointments.index') }}" class="flex items-center gap-4">
        <div class="relative flex-1 max-w-sm">
            <svg class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input type="text" name="search" value="{{ request('search') }}" placeholder="Buscar paciente..." class="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        </div>

        <input type="date" name="date" value="{{ request('date') }}" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">

        <select name="status" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Todos los estados</option>
            <option value="confirmed" {{ request('status') === 'confirmed' ? 'selected' : '' }}>Confirmada</option>
            <option value="pending" {{ request('status') === 'pending' ? 'selected' : '' }}>Pendiente</option>
            <option value="completed" {{ request('status') === 'completed' ? 'selected' : '' }}>Completada</option>
            <option value="cancelled" {{ request('status') === 'cancelled' ? 'selected' : '' }}>Cancelada</option>
        </select>

        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Filtrar
        </button>

        <a href="{{ route('appointments.create') }}" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Nueva Cita
        </a>
    </form>
</div>

<!-- Appointments Table -->
<div class="bg-white rounded-lg shadow-sm border">
    <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Lista de Citas</h3>
        <p class="text-sm text-gray-500">Todas las citas programadas en el sistema</p>
    </div>
    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tratamiento</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                @forelse($appointments as $appointment)
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {{ $appointment->appointment_date->format('d/m/Y') }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {{ $appointment->appointment_time->format('H:i') }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div>
                                <div class="text-sm font-medium text-gray-900">{{ $appointment->patient->full_name }}</div>
                                <div class="text-sm text-gray-500">{{ $appointment->patient->phone }}</div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {{ $appointment->treatment->name }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {{ $appointment->doctor->full_name }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                @if($appointment->status === 'confirmed') bg-green-100 text-green-800
                                @elseif($appointment->status === 'pending') bg-yellow-100 text-yellow-800
                                @elseif($appointment->status === 'completed') bg-blue-100 text-blue-800
                                @else bg-red-100 text-red-800
                                @endif">
                                {{ ucfirst($appointment->status) }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div class="flex items-center space-x-2">
                                <a href="{{ route('appointments.show', $appointment) }}" class="text-blue-600 hover:text-blue-900">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                </a>
                                <a href="{{ route('appointments.edit', $appointment) }}" class="text-indigo-600 hover:text-indigo-900">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                </a>
                                <form action="{{ route('appointments.destroy', $appointment) }}" method="POST" class="inline" onsubmit="return confirm('¿Estás seguro de eliminar esta cita?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-600 hover:text-red-900">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                            No se encontraron citas
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
    
    @if($appointments->hasPages())
        <div class="px-6 py-4 border-t border-gray-200">
            {{ $appointments->links() }}
        </div>
    @endif
</div>
@endsection
