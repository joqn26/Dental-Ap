<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('doctor_id')->constrained()->onDelete('cascade');
            $table->foreignId('treatment_id')->constrained()->onDelete('cascade');
            $table->date('appointment_date');
            $table->time('appointment_time');
            $table->integer('duration'); // en minutos
            $table->enum('status', ['confirmed', 'pending', 'completed', 'cancelled'])->default('confirmed');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('appointments');
    }
};
