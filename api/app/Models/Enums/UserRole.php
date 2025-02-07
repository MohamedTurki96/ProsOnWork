<?php

namespace App\Models\Enums;

enum UserRole: string
{
    case ADMIN = "ADMIN";
    case CLIENT = "CLIENT";
    case SERVICE_PROVIDER = "SERVICE_PROVIDER";

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
