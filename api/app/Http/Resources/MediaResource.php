<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "MediaResource",
    description: "Represents a media file",
    required: ["id", "filename", "filePath"],
    properties: [
        new OA\Property(property: "id", type: "integer", example: 1),
        new OA\Property(property: "filename", type: "string", example: "image.png"),
        new OA\Property(property: "filePath", type: "string", example: "/storage/media/image.png"),
        new OA\Property(property: "fileType", type: "string", example: "image/png"),
        new OA\Property(property: "size", type: "integer", example: 204800),
    ]
)]
class MediaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'filename' => $this->filename,
            'filePath' => $this->file_path,
            'fileType' => $this->file_type,
            'size' => $this->size,
        ];
    }
}
