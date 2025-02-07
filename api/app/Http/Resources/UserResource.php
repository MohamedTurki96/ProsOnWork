<?php

namespace App\Http\Resources;

use App\Models\Enums\UserRole;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Http;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "UserResource",
    required: ["id", "name", "email", "role", "address"],
    properties: [
        new OA\Property(property: "id", type: "integer", example: 1),
        new OA\Property(property: "name", type: "string", example: "John Doe"),
        new OA\Property(property: "email", type: "string", example: "john@example.com"),
        new OA\Property(property: "role", ref: "#/components/schemas/UserRoleEnum", example: UserRole::CLIENT->value),
        new OA\Property(property: "address", ref: "#/components/schemas/Address"),
        new OA\Property(property: "phone", type: "string"),
        new OA\Property(property: "avatar", ref: "#/components/schemas/MediaResource"),
        new OA\Property(property:"createdAt", type:"string", format:"date-time"),
    ]
)]
#[OA\Schema(
    schema: "UserRoleEnum",
    description: "Possible roles for a user",
    type: "string",
    enum: [UserRole::CLIENT->value, UserRole::SERVICE_PROVIDER->value, UserRole::ADMIN->value]
)]
#[OA\Schema(
    schema: "Address",
    required: ["longitude", "latitude"],
    properties: [
        new OA\Property(property: "longitude", type: "double"),
        new OA\Property(property: "latitude", type: "double"),
    ]
)]
class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        if ($this->address) {
            list($longitude, $latitude) = explode('|', $this->address);
            $address = [
                "longitude" => $longitude,
                "latitude" => $latitude
            ];

        } else {
            $address = null;
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'phone' => $this->phone,
            'address' => $address,
            'avatar' => new MediaResource($this->avatar),
            'createdAt' => $this->created_at
        ];
    }
}
