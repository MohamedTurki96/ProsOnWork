<?php

namespace App\Models\Enums;

enum PaymentType: string
{
    case CASH_IN = "CASH_IN";
    case CASH_OUT = "CASH_OUT";


    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
