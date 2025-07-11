<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Treatment extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'duration',
        'price',
        'status'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'duration' => 'integer'
    ];

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function patients()
    {
        return $this->belongsToMany(Patient::class, 'patient_treatments')
                    ->withPivot('notes', 'completed_at')
                    ->withTimestamps();
    }
}
