<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "RegisterRequest",
    required: ["name", "email", "password", "isClient"],
    properties: [
        new OA\Property(property: "name", type: "string", example: "John Doe"),
        new OA\Property(property: "email", type: "string", format: "email", example: "john@example.com"),
        new OA\Property(property: "password", type: "string", format: "password", example: "securePass123"),
        new OA\Property(property: "isClient", type: "boolean", example: true)
    ]
)]
class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return !$this->user();
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'isClient' => ['required', 'boolean'],
        ];
    }
}
