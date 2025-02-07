<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Enums\PriceType;
use App\Models\Enums\ProductType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'serviceProviderId' => User::factory(),
            'categoryId' => Category::factory(),
            'name' => $this->faker->word(),
            'description' => $this->faker->paragraph(),
            'address' => $this->faker->longitude(). "|" . $this->faker->latitude(),
            'border' => $this->faker->optional()->numberBetween(1, 100),
            'isActive' => $this->faker->boolean(),
            'price' => $this->faker->randomFloat(2, 5, 1000),
            'priceType' => $this->faker->randomElement(PriceType::values()),
            'type' => $this->faker->randomElement(ProductType::values()),
            'includes' => json_encode(['Hosting', 'Domain']),
            'faq' => json_encode([
                ['question' => 'Do you provide support?', 'answer' => 'Yes, 24/7 support is available.']
            ]),
        ];
    }
}
