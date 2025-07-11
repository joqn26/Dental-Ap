<?php

namespace Database\Seeders;

use App\Models\Treatment;
use Illuminate\Database\Seeder;

class TreatmentSeeder extends Seeder
{
    public function run()
    {
        $treatments = [
            ['name' => 'Limpieza dental', 'description' => 'Limpieza profesional y profilaxis', 'duration' => 60, 'price' => 50.00],
            ['name' => 'Extracción', 'description' => 'Extracción de pieza dental', 'duration' => 90, 'price' => 80.00],
            ['name' => 'Endodoncia', 'description' => 'Tratamiento de conducto radicular', 'duration' => 120, 'price' => 200.00],
            ['name' => 'Ortodoncia', 'description' => 'Revisión y ajuste de brackets', 'duration' => 45, 'price' => 100.00],
            ['name' => 'Implante', 'description' => 'Colocación de implante dental', 'duration' => 180, 'price' => 800.00],
        ];

        foreach ($treatments as $treatment) {
            Treatment::create($treatment);
        }
    }
}
