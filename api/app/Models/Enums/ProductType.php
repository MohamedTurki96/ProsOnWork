<?php

namespace App\Models\Enums;

enum ProductType: string
{
    case SERVICE = "SERVICE";
    case EQUIPMENT = "EQUIPMENT";

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
