<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    /** @use HasFactory<\Database\Factories\MessageFactory> */
    use HasFactory;

    public function chat(): BelongsTo
    {
        return $this->belongsTo(Chat::class, 'chatId');
    }

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'senderId');
    }
}
