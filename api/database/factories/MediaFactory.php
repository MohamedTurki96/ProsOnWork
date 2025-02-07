<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Media>
 */
class MediaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'filename' => $this->faker->word() . '.jpg',
            'file_path' => "https://picsum.photos/200",
            'file_type' => 'image/jpeg',
            'size' => $this->faker->numberBetween(1000, 500000)
        ];
    }
}
