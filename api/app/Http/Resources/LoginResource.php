<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "LoginResource",
    properties: [
        new OA\Property(property: "access_token", description: "The access token for the logged-in user", type: "string"),
        new OA\Property(property: "user", ref: "#/components/schemas/UserResource", description: "The user object containing user details", type: "object")
    ]
)]
class LoginResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'access_token' => $this->access_token,
            'user' => new UserResource($this->user),
        ];
    }
}
