<?php

use App\Models\Enums\PaymentStatus;
use App\Models\Enums\PaymentType;
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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('walletId')->constrained('wallets');
            $table->enum('type', PaymentType::values());
            $table->double('amount')->default(0);
            $table->enum('status', PaymentStatus::values())->default(PaymentStatus::PENDING->value);
            $table->timestamps();

            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
