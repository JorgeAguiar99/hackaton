<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('alunos_id');
            $table->unsignedBigInteger('livros_id');
            $table->date('dataInicio');
            $table->date('dataFim');
            $table->string('observacao');

            $table->foreign('alunos_id')->references('id')->on('alunos');
            $table->foreign('livros_id')->references('id')->on('livros');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
