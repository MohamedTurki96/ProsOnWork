<?php

namespace App\Models\Enums;

enum MessageType: string
{
    case TEXT = "TEXT";
    case IMAGE = "IMAGE";

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
