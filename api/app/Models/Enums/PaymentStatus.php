<?php

namespace App\Models\Enums;

enum PaymentStatus: string
{
    case PENDING = "PENDING";
    case COMPLETED = "COMPLETED";
    case FAILED = "FAILED";

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
