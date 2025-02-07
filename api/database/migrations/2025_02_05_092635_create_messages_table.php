<?php

use App\Models\Enums\MessageType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('senderId')->constrained('users');
            $table->foreignId('chatId')->constrained('chats');
            $table->enum('type', MessageType::values())->default(MessageType::TEXT->value);
            $table->longText('content')->nullable();
            $table->foreignId('mediaId')->nullable()->constrained('media');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
