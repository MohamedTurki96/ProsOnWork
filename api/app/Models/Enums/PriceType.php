<?php

namespace App\Models\Enums;

enum PriceType: string
{
    case HOUR = "HOUR";
    case PACKAGE = "PACKAGE";

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
