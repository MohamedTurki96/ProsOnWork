<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "CategoryResource",
    description: "Represents a category",
    required: ["id", "name", "icon", "image"],
    properties: [
        new OA\Property(property: "id", type: "integer", example: 1),
        new OA\Property(property: "name", type: "string", example: "Electronics"),
        new OA\Property(property: "icon", ref: "#/components/schemas/MediaResource"),
        new OA\Property(property: "image", ref: "#/components/schemas/MediaResource"),
    ]
)]
class CategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'icon' => new MediaResource($this->icon),
            'image' => new MediaResource($this->image),
        ];
    }
}
