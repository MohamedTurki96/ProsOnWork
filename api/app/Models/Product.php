<?php

namespace App\Models;

use App\Models\Enums\PriceType;
use App\Models\Enums\ProductType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'serviceProviderId',
        'categoryId',
        'name',
        'description',
        'address',
        'border',
        'isActive',
        'price',
        'priceType',
        'type',
        'includes',
        'fag',
    ];

    protected $casts = [
        'isActive' => 'boolean',
        'includes' => 'array',
        'fag' => 'array',
        'type' => ProductType::class,
        'priceType' => PriceType::class,
    ];

    public function serviceProvider(): BelongsTo
    {
        return $this->belongsTo(User::class, 'serviceProviderId');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'categoryId');
    }

    public function feedbacks(): HasMany
    {
        return $this->hasMany(Feedback::class);
    }

    public function reclamations(): HasMany
    {
        return $this->hasMany(Reclamation::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function images(): BelongsToMany
    {
        return $this->belongsToMany(Media::class, 'product_image', 'chat_id', 'media_id');
    }

    public function videos(): BelongsToMany
    {
        return $this->belongsToMany(Media::class, 'product_video', 'product_id', 'media_id');
    }
}
