<?php

namespace Database\Factories;

use App\Models\Enums\ReservationStatus;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
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
            'startDate' => $this->faker->dateTimeBetween('+1 days', '+1 month'),
            'endDate' => $this->faker->dateTimeBetween('+1 month', '+2 months'),
            'status' => $this->faker->randomElement(ReservationStatus::values()),
        ];
    }
}
