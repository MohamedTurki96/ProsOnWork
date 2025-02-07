<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CategoryCollection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use OpenApi\Attributes as OA;

class CategoryController extends Controller
{
    #[OA\Get(
        path: "/api/categories",
        operationId: "listCategories",
        summary: "Get all categories",
        tags: ["Category"],
        responses: [
            new OA\Response(response: 200, description: "Success", content: new OA\JsonContent(ref: "#/components/schemas/CategoryCollection")),
        ]
    )]
    public function index(): JsonResponse
    {
        return response()->json(new CategoryCollection(Category::all()));
    }

    #[OA\Post(
        path: "/api/categories",
        operationId: "storeCategory",
        summary: "Create a new category",
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(ref: "#/components/schemas/StoreCategoryRequest")
        ),
        tags: ["Category"],
        responses: [
            new OA\Response(response: 201, description: "Created", content: new OA\JsonContent(ref: "#/components/schemas/CategoryResource")),
            new OA\Response(response: 422, description: "Validation Error"),
        ]
    )]
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $category = Category::create($request->validated());
        return response()->json(new CategoryResource($category), 201);
    }

    #[OA\Get(
        path: "/api/categories/{id}",
        operationId: "getCategory",
        summary: "Get a specific category",
        tags: ["Category"],
        parameters: [
            new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(response: 200, description: "Success", content: new OA\JsonContent(ref: "#/components/schemas/CategoryResource")),
            new OA\Response(response: 404, description: "Not Found"),
        ]
    )]
    public function show(Category $category): JsonResponse
    {
        return response()->json(new CategoryResource($category));
    }

    #[OA\Put(
        path: "/api/categories/{id}",
        operationId: "updateCategory",
        summary: "Update a category",
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(ref: "#/components/schemas/UpdateCategoryRequest")
        ),
        tags: ["Category"],
        parameters: [
            new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(response: 200, description: "Updated", content: new OA\JsonContent(ref: "#/components/schemas/CategoryResource")),
            new OA\Response(response: 404, description: "Not Found"),
            new OA\Response(response: 422, description: "Validation Error"),
        ]
    )]
    public function update(UpdateCategoryRequest $request, Category $category): JsonResponse
    {
        $category->update($request->validated());
        return response()->json(new CategoryResource($category));
    }

    #[OA\Delete(
        path: "/api/categories/{id}",
        operationId: "deleteCategory",
        summary: "Delete a category",
        tags: ["Category"],
        parameters: [
            new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(response: 204, description: "No Content"),
            new OA\Response(response: 404, description: "Not Found"),
        ]
    )]
    public function destroy(Category $category): Response
    {
        $category->delete();
        return response()->noContent();
    }
}
