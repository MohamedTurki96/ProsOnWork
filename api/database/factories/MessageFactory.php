<?php

namespace Database\Factories;

use App\Models\Chat;
use App\Models\Enums\MessageType;
use App\Models\Media;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $messageType = $this->faker->randomElement(MessageType::values());
        $isText = $messageType == MessageType::TEXT->value;

        return [
            'senderId' => User::factory(),
            'chatId' => Chat::factory(),
            'type' => $this->faker->randomElement(MessageType::values()),
            'content' => $isText ? $this->faker->sentence() : null,
            'mediaId' => !$isText ? Media::factory() : null,
        ];
    }
}
