<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "ProductResource",
    required: ["id", "serviceProvider", "category", "name", "description", "address", "border", "isActive", "price", "priceType", "type", "includes", "faq", "images", "videos"],
    properties: [
        new OA\Property(property: "id", type: "integer", example: 1),
        new OA\Property(property: "serviceProvider", ref: "#/components/schemas/UserResource"),
        new OA\Property(property: "category", ref: "#/components/schemas/CategoryResource"),
        new OA\Property(property: "name", type: "string", example: "Web Development Service"),
        new OA\Property(property: "description", type: "string", example: "Custom website development for businesses."),
        new OA\Property(property: "address", ref: "#/components/schemas/Address"),
        new OA\Property(property: "border", type: "integer", example: 5, nullable: true),
        new OA\Property(property: "isActive", type: "boolean", example: true),
        new OA\Property(property: "price", type: "number", format: "double", example: 49.99),
        new OA\Property(property: "priceType", ref: "#/components/schemas/PriceTypeEnum"),
        new OA\Property(property: "type", ref: "#/components/schemas/ProductTypeEnum"),
        new OA\Property(
            property: "includes",
            type: "array",
            items: new OA\Items(type: "string"),
            example: ["Hosting", "Domain"]
        ),
        new OA\Property(
            property: "faq",
            type: "array",
            items: new OA\Items(ref: "#/components/schemas/FaqResource")
        ),
        new OA\Property(property: "images", type: "array", items: new OA\Items(ref: "#/components/schemas/MediaResource")),
        new OA\Property(property: "videos", type: "array", items: new OA\Items(ref: "#/components/schemas/MediaResource")),
    ],
    type: "object"
)]
#[OA\Schema(
    schema: "FaqResource",
    properties: [
        new OA\Property(property: "question", type: "string", example: "Do you provide support?"),
        new OA\Property(property: "answer", type: "string", example: "Yes, we provide 24/7 support."),
    ],
    type: "object"
)]
#[OA\Schema(
    schema: "PriceTypeEnum",
    description: "different pricing types",
    type: "string",
    enum: ["HOUR", "PACKAGE"],
    example: "HOUR"
)]
#[OA\Schema(
    schema: "ProductTypeEnum",
    description: "different product types",
    type: "string",
    enum: ["SERVICE", "EQUIPMENT"],
    example: "SERVICE"
)]
class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
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
            'serviceProvider' => new UserResource($this->serviceProvider),
            'category' => new CategoryResource($this->category),
            'name' => $this->name,
            'description' => $this->description,
            'address' => $address,
            'border' => $this->border,
            'isActive' => $this->isActive,
            'price' => $this->price,
            'priceType' => $this->priceType,
            'type' => $this->type,
            'includes' => json_decode($this->includes ?? "[]"),
            'faq' => json_decode($this->faq ?? "[]"),
            'images' => MediaResource::collection($this->images),
            'videos' => MediaResource::collection($this->videos),
        ];
    }
}
