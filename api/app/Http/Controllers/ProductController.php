<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class ProductController extends Controller
{
    #[OA\Get(
        path: "/api/products",
        operationId: 'listProducts',
        summary: "Retrieve a list of products",
        tags: ["Products"],
        parameters: [
            new OA\Parameter(
                name: "longitude",
                description: "Longitude of the location for filtering products",
                in: "query",
                required: false,
                schema: new OA\Schema(type: "number", format: "float")
            ),
            new OA\Parameter(
                name: "latitude",
                description: "Latitude of the location for filtering products",
                in: "query",
                required: false,
                schema: new OA\Schema(type: "number", format: "float")
            ),
            new OA\Parameter(
                name: "q",
                description: "Search query for filtering products",
                in: "query",
                required: false,
                schema: new OA\Schema(type: "string")
            ),
            new OA\Parameter(
                name: "rating",
                description: "Rating filter, can accept multiple values",
                in: "query",
                required: false,
                schema: new OA\Schema(type: "array", items: new OA\Items(type: "integer"))
            ),
            new OA\Parameter(
                name: "categories",
                description: "Filter by categories, can accept multiple values",
                in: "query",
                required: false,
                schema: new OA\Schema(type: "array", items: new OA\Items(type: "integer"))
            ),
            new OA\Parameter(
                name: "minPrice",
                description: "Minimum price for filtering products",
                in: "query",
                required: false,
                schema: new OA\Schema(type: "number", format: "float")
            ),
            new OA\Parameter(
                name: "maxPrice",
                description: "Maximum price for filtering products",
                in: "query",
                required: false,
                schema: new OA\Schema(type: "number", format: "float")
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "List of products",
                content: new OA\JsonContent(
                    type: "array",
                    items: new OA\Items(ref: "#/components/schemas/ProductResource")
                )
            )
        ]
    )]
    public function index(Request $request): JsonResponse
    {
        $query = Product::query();

        if ($request->has('q')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'LIKE', '%' . $request->q . '%')
                    ->orWhere('description', 'LIKE', '%' . $request->q . '%');
            });
        }

        if ($request->has('categories')) {
            $categories = (array) $request->categories;
            $query->whereIn('categoryId', $categories);
        }

        if ($request->has('minPrice') || $request->has('maxPrice')) {
            $query->whereBetween('price', [
                $request->input('minPrice', 0),
                $request->input('maxPrice', PHP_INT_MAX),
            ]);
        }

        if ($request->has(['longitude', 'latitude'])) {
            $longitude = $request->longitude;
            $latitude = $request->latitude;

            $query->where(function ($q) use ($longitude, $latitude) {
                $q->whereRaw(
                    "(6371 * acos(cos(radians(?)) * cos(radians(SUBSTRING_INDEX(address, '|', 1)))
                * cos(radians(SUBSTRING_INDEX(address, '|', -1)) - radians(?))
                + sin(radians(?)) * sin(radians(SUBSTRING_INDEX(address, '|', 1))))) <= border",
                    [$latitude, $longitude, $latitude]
                );
            });
        }

        return response()->json(ProductResource::collection($query->get()));
    }

    #[OA\Post(
        path: "/api/products",
        operationId: 'storeProduct',
        summary: "Create a new product",
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(ref: "#/components/schemas/StoreProductRequest")
        ),
        tags: ["Products"],
        responses: [
            new OA\Response(response: 201, description: "Product created", content: new OA\JsonContent(ref: "#/components/schemas/ProductResource")),
            new OA\Response(response: 422, description: "Validation errors")
        ]
    )]
    public function store(StoreProductRequest $request): JsonResponse
    {
        $product = Product::create($request->validated());
        return response()->json(new ProductResource($product), 201);
    }

    #[OA\Get(
        path: "/api/products/{id}",
        operationId: 'getProduct',
        summary: "Retrieve a specific product",
        tags: ["Products"],
        parameters: [
            new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(response: 200, description: "Product details", content: new OA\JsonContent(ref: "#/components/schemas/ProductResource")),
            new OA\Response(response: 404, description: "Product not found")
        ]
    )]
    public function show(int $id): JsonResponse
    {
        return response()->json(new ProductResource(Product::find($id)));
    }

    #[OA\Put(
        path: "/api/products/{id}",
        operationId: 'updateProduct',
        summary: "Update a product",
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(ref: "#/components/schemas/UpdateProductRequest")
        ),
        tags: ["Products"],
        parameters: [
            new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(response: 200, description: "Product updated", content: new OA\JsonContent(ref: "#/components/schemas/ProductResource")),
            new OA\Response(response: 404, description: "Product not found"),
            new OA\Response(response: 422, description: "Validation errors")
        ]
    )]
    public function update(UpdateProductRequest $request, Product $product): JsonResponse
    {
        $product->update($request->validated());
        return response()->json(new ProductResource($product));
    }

    #[OA\Delete(
        path: "/api/products/{id}",
        operationId: 'deleteProduct',
        summary: "Delete a product",
        tags: ["Products"],
        parameters: [
            new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(response: 204, description: "Product deleted"),
            new OA\Response(response: 404, description: "Product not found")
        ]
    )]
    public function destroy(Product $product): JsonResponse
    {
        $product->delete();
        return response()->json(null, 204);
    }
}
