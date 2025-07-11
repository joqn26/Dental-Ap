<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $query = Patient::query();

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('first_name', 'like', '%' . $request->search . '%')
                  ->orWhere('last_name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $patients = $query->orderBy('created_at', 'desc')->paginate(12);

        return view('patients.index', compact('patients'));
    }

    public function create()
    {
        return view('patients.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:patients,email',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:500',
            'birth_date' => 'required|date|before:today',
            'insurance' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:1000'
        ]);

        $validated['status'] = 'active';

        Patient::create($validated);

        return redirect()->route('patients.index')
                        ->with('success', 'Paciente registrado exitosamente.');
    }

    public function show(Patient $patient)
    {
        $patient->load(['appointments.treatment', 'appointments.doctor', 'treatments']);
        return view('patients.show', compact('patient'));
    }

    public function edit(Patient $patient)
    {
        return view('patients.edit', compact('patient'));
    }

    public function update(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:patients,email,' . $patient->id,
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:500',
            'birth_date' => 'required|date|before:today',
            'insurance' => 'nullable|string|max:255',
            'status' => 'required|in:active,inactive',
            'notes' => 'nullable|string|max:1000'
        ]);

        $patient->update($validated);

        return redirect()->route('patients.index')
                        ->with('success', 'Paciente actualizado exitosamente.');
    }

    public function destroy(Patient $patient)
    {
        $patient->delete();

        return redirect()->route('patients.index')
                        ->with('success', 'Paciente eliminado exitosamente.');
    }
}
