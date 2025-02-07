<?php

namespace Database\Factories;

use App\Models\Enums\PaymentStatus;
use App\Models\Enums\PaymentType;
use App\Models\Wallet;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'walletId' => Wallet::factory(),
            'type' => $this->faker->randomElement(PaymentType::values()),
            'amount' => $this->faker->randomFloat(2, 5, 1000),
            'status' => $this->faker->randomElement(PaymentStatus::values()),
        ];
    }
}
