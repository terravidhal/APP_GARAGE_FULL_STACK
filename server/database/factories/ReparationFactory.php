<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Vehicule;

class ReparationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'vehicule_id' => Vehicule::factory(),
            'date' => $this->faker->date(),
            'duree_main_oeuvre' => $this->faker->numberBetween(1, 5) . ' heures',
            'objet_reparation' => $this->faker->sentence,
        ];
    }
}