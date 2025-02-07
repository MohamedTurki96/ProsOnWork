<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use function Symfony\Component\Translation\t;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function icon(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'iconId');
    }

    public function image(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'imageId');
    }
}
