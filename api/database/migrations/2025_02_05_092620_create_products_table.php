<?php

use App\Models\Enums\PriceType;
use App\Models\Enums\ProductType;
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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('serviceProviderId')->constrained('users');
            $table->foreignId('categoryId')->constrained('categories');
            $table->string('name');
            $table->longText('description');
            $table->string('address')->nullable();
            $table->integer('border')->nullable();
            $table->boolean('isActive')->default(true);
            $table->double('price')->default(0);
            $table->enum('priceType', PriceType::values())->default(PriceType::HOUR->value);
            $table->enum('type', ProductType::values())->default(ProductType::SERVICE->value);
            $table->json('includes')->nullable();
            $table->json('faq')->nullable();
            $table->timestamps();
        });

        Schema::create('product_image', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chat_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('media_id')->constrained('media')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('product_video', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('media_id')->constrained('media')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
