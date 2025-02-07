<?php

namespace App\Models\Enums;

enum ReclamationStatus: string
{
    case OPEN = "OPEN";
    case IN_PROGRESS = "IN_PROGRESS";
    case RESOLVED = "RESOLVED";

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
