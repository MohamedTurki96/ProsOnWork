<?php

namespace Database\Factories;

use App\Models\Enums\ReclamationStatus;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reclamation>
 */
class ReclamationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'userId' => User::factory(),
            'productId' => Product::factory(),
            'comment' => $this->faker->paragraph(),
            'status' => $this->faker->randomElement(ReclamationStatus::values()),
        ];
    }
}
