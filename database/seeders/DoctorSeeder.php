<?php

namespace Database\Seeders;

use App\Models\Doctor;
use Illuminate\Database\Seeder;

class DoctorSeeder extends Seeder
{
    public function run()
    {
        Doctor::create([
            'first_name' => 'John',
            'last_name' => 'Smith',
            'email' => 'dr.smith@dentalcare.com',
            'phone' => '+34 91 123 45 67',
            'specialization' => 'Odontología General',
            'license_number' => 'COL12345',
            'status' => 'active'
        ]);

        Doctor::create([
            'first_name' => 'Sarah',
            'last_name' => 'Johnson',
            'email' => 'dr.johnson@dentalcare.com',
            'phone' => '+34 91 123 45 68',
            'specialization' => 'Cirugía Oral',
            'license_number' => 'COL12346',
            'status' => 'active'
        ]);
    }
}
