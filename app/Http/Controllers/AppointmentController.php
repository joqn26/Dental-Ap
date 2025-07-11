<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Patient;
use App\Models\Doctor;
use App\Models\Treatment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index(Request $request)
    {
        $query = Appointment::with(['patient', 'doctor', 'treatment']);

        if ($request->filled('date')) {
            $query->whereDate('appointment_date', $request->date);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $query->whereHas('patient', function ($q) use ($request) {
                $q->where('first_name', 'like', '%' . $request->search . '%')
                  ->orWhere('last_name', 'like', '%' . $request->search . '%');
            });
        }

        $appointments = $query->orderBy('appointment_date', 'desc')
                             ->orderBy('appointment_time', 'desc')
                             ->paginate(15);

        return view('appointments.index', compact('appointments'));
    }

    public function create()
    {
        $patients = Patient::where('status', 'active')->get();
        $doctors = Doctor::where('status', 'active')->get();
        $treatments = Treatment::where('status', 'active')->get();

        return view('appointments.create', compact('patients', 'doctors', 'treatments'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'treatment_id' => 'required|exists:treatments,id',
            'appointment_date' => 'required|date|after_or_equal:today',
            'appointment_time' => 'required|date_format:H:i',
            'notes' => 'nullable|string|max:1000'
        ]);

        $treatment = Treatment::find($validated['treatment_id']);
        $validated['duration'] = $treatment->duration;
        $validated['status'] = 'confirmed';

        Appointment::create($validated);

        return redirect()->route('appointments.index')
                        ->with('success', 'Cita creada exitosamente.');
    }

    public function show(Appointment $appointment)
    {
        $appointment->load(['patient', 'doctor', 'treatment']);
        return view('appointments.show', compact('appointment'));
    }

    public function edit(Appointment $appointment)
    {
        $patients = Patient::where('status', 'active')->get();
        $doctors = Doctor::where('status', 'active')->get();
        $treatments = Treatment::where('status', 'active')->get();

        return view('appointments.edit', compact('appointment', 'patients', 'doctors', 'treatments'));
    }

    public function update(Request $request, Appointment $appointment)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'treatment_id' => 'required|exists:treatments,id',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required|date_format:H:i',
            'status' => 'required|in:confirmed,pending,completed,cancelled',
            'notes' => 'nullable|string|max:1000'
        ]);

        $treatment = Treatment::find($validated['treatment_id']);
        $validated['duration'] = $treatment->duration;

        $appointment->update($validated);

        return redirect()->route('appointments.index')
                        ->with('success', 'Cita actualizada exitosamente.');
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();

        return redirect()->route('appointments.index')
                        ->with('success', 'Cita eliminada exitosamente.');
    }
}
