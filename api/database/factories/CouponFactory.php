<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Coupon>
 */
class CouponFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => strtoupper($this->faker->unique()->bothify('??##??')),
            'discount' => $this->faker->numberBetween(5, 50),
            'expiresAt' => $this->faker->dateTimeBetween('+1 week', '+6 months'),
        ];
    }
}
