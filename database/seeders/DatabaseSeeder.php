<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            DoctorSeeder::class,
            TreatmentSeeder::class,
            PatientSeeder::class,
            AppointmentSeeder::class,
        ]);
    }
}
