@extends('layouts.app')

@section('title', 'Nueva Cita')
@section('subtitle', 'Agendar una nueva cita médica')

@section('content')
<div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-lg shadow-sm border">
        <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Agendar Nueva Cita</h3>
            <p class="text-sm text-gray-500">Completa los datos para agendar una nueva cita</p>
        </div>
        
        <form action="{{ route('appointments.store') }}" method="POST" class="p-6 space-y-6">
            @csrf
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="patient_id" class="block text-sm font-medium text-gray-700 mb-2">Paciente</label>
                    <select name="patient_id" id="patient_id" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 @error('patient_id') border-red-500 @enderror">
                        <option value="">Seleccionar paciente</option>
                        @foreach($patients as $patient)
                            <option value="{{ $patient->id }}" {{ old('patient_id') == $patient->id ? 'selected' : '' }}>
                                {{ $patient->full_name }}
                            </option>
                        @endforeach
                    </select>
                    @error('patient_id')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="doctor_id" class="block text-sm font-medium text-gray-700 mb-2">Doctor</label>
                    <select name="doctor_id" id="doctor_id" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 @error('doctor_id') border-red-500 @enderror">
                        <option value="">Seleccionar doctor</option>
                        @foreach($doctors as $doctor)
                            <option value="{{ $doctor->id }}" {{ old('doctor_id') == $doctor->id ? 'selected' : '' }}>
                                {{ $doctor->full_name }}
                            </option>
                        @endforeach
                    </select>
                    @error('doctor_id')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
            </div>

            <div>
                <label for="treatment_id" class="block text-sm font-medium text-gray-700 mb-2">Tratamiento</label>
                <select name="treatment_id" id="treatment_id" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 @error('treatment_id') border-red-500 @enderror">
                    <option value="">Seleccionar tratamiento</option>
                    @foreach($treatments as $treatment)
                        <option value="{{ $treatment->id }}" {{ old('treatment_id') == $treatment->id ? 'selected' : '' }}>
                            {{ $treatment->name }} ({{ $treatment->duration }} min - ${{ number_format($treatment->price, 0) }})
                        </option>
                    @endforeach
                </select>
                @error('treatment_id')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="appointment_date" class="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                    <input type="date" name="appointment_date" id="appointment_date" value="{{ old('appointment_date') }}" required min="{{ date('Y-m-d') }}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 @error('appointment_date') border-red-500 @enderror">
                    @error('appointment_date')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="appointment_time" class="block text-sm font-medium text-gray-700 mb-2">Hora</label>
                    <input type="time" name="appointment_time" id="appointment_time" value="{{ old('appointment_time') }}" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 @error('appointment_time') border-red-500 @enderror">
                    @error('appointment_time')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
            </div>

            <div>
                <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">Notas</label>
                <textarea name="notes" id="notes" rows="3" placeholder="Notas adicionales..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 @error('notes') border-red-500 @enderror">{{ old('notes') }}</textarea>
                @error('notes')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <a href="{{ route('appointments.index') }}" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Cancelar
                </a>
                <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Agendar Cita
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
