<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class VehiculeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'immatriculation' => strtoupper($this->faker->bothify('??-####-??')),
            'marque' => $this->faker->company,
            'modele' => $this->faker->word,
            'couleur' => $this->faker->safeColorName,
            'annee' => $this->faker->year,
            'kilometrage' => $this->faker->numberBetween(10000, 200000),
            'carosserie' => $this->faker->word,
            'energie' => $this->faker->randomElement(['Essence', 'Diesel', 'Électrique']),
            'boite' => $this->faker->randomElement(['Manuelle', 'Automatique']),
        ];
    }
}