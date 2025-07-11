<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'specialization',
        'license_number',
        'status'
    ];

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function getFullNameAttribute()
    {
        return 'Dr. ' . $this->first_name . ' ' . $this->last_name;
    }
}
