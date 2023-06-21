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
        Schema::create('livros', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('subTitulo');
            $table->string('isbn');
            $table->unsignedBigInteger('autores_id');
            $table->unsignedBigInteger('editoras_id');
            $table->string('local');
            $table->integer('ano');

            $table->foreign('autores_id')->references('id')->on('autores');
            $table->foreign('editoras_id')->references('id')->on('editoras');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livros');
    }
};
