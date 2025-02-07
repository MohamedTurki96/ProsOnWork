<?php

namespace App\Models\Enums;

enum ReservationStatus: string
{
    case PENDING = "PENDING";
    case CONFIRMED = "CONFIRMED";
    case CANCELED = "CANCELED";


    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
