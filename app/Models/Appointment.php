<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'doctor_id',
        'treatment_id',
        'appointment_date',
        'appointment_time',
        'duration',
        'status',
        'notes'
    ];

    protected $casts = [
        'appointment_date' => 'date',
        'appointment_time' => 'datetime',
        'duration' => 'integer'
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function treatment()
    {
        return $this->belongsTo(Treatment::class);
    }

    public function scopeToday($query)
    {
        return $query->whereDate('appointment_date', today());
    }

    public function scopeUpcoming($query)
    {
        return $query->where('appointment_date', '>=', today());
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}
