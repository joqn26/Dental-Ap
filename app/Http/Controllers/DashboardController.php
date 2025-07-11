<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Patient;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $todayAppointments = Appointment::with(['patient', 'treatment', 'doctor'])
            ->today()
            ->orderBy('appointment_time')
            ->get();

        $stats = [
            'appointments_today' => Appointment::today()->count(),
            'active_patients' => Patient::where('status', 'active')->count(),
            'monthly_revenue' => Appointment::whereMonth('appointment_date', now()->month)
                ->whereYear('appointment_date', now()->year)
                ->where('status', 'completed')
                ->join('treatments', 'appointments.treatment_id', '=', 'treatments.id')
                ->sum('treatments.price'),
            'next_appointment' => Appointment::with('patient')
                ->where('appointment_date', '>=', now())
                ->orderBy('appointment_date')
                ->orderBy('appointment_time')
                ->first()
        ];

        return view('dashboard.index', compact('todayAppointments', 'stats'));
    }
}
