<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'birth_date',
        'insurance',
        'status',
        'notes'
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function treatments()
    {
        return $this->belongsToMany(Treatment::class, 'patient_treatments')
                    ->withPivot('notes', 'completed_at')
                    ->withTimestamps();
    }

    public function getFullNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function getAgeAttribute()
    {
        return $this->birth_date ? $this->birth_date->age : null;
    }

    public function getLastVisitAttribute()
    {
        return $this->appointments()
                    ->where('status', 'completed')
                    ->latest('appointment_date')
                    ->first()?->appointment_date;
    }

    public function getNextAppointmentAttribute()
    {
        return $this->appointments()
                    ->where('status', 'confirmed')
                    ->where('appointment_date', '>', now())
                    ->oldest('appointment_date')
                    ->first()?->appointment_date;
    }
}
