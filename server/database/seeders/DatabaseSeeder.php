<?php

namespace Database\Seeders;

use App\Models\Reparation;
use App\Models\Technicien;
use App\Models\User;
use App\Models\Vehicule;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

       /* User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);*/

        Vehicule::factory(10)->create();
        Technicien::factory(5)->create();

        Reparation::factory(15)->create()->each(function ($reparation) {
            $reparation->techniciens()->attach(
                Technicien::inRandomOrder()->take(rand(1, 3))->pluck('id')
            );
        });
    }
}
