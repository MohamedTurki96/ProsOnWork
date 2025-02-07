<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\Enums\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use OpenApi\Attributes as OA;

class AuthController extends Controller
{
    #[OA\Post(
        path: '/api/auth/register',
        operationId: "register",
        summary: 'Register a new user',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(ref: '#/components/schemas/RegisterRequest')
        ),
        tags: ['Authentication'],
        responses: [
            new OA\Response(response: 201, description: 'User registered successfully'),
            new OA\Response(response: 422, description: 'Validation error')
        ]
    )]

    public function register(RegisterRequest $request)
    {
        $validated = (object) $request->validated();

        User::create([
            'name' => $validated->name,
            'email' => $validated->email,
            'password' => Hash::make($validated->password),
            'role' => $validated->isClient ? UserRole::CLIENT->value : UserRole::SERVICE_PROVIDER->value
        ]);

        return response()->json([]);
    }

    #[OA\Post(
        path: '/api/auth/login',
        operationId: "login",
        summary: 'User login',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(ref: '#/components/schemas/LoginRequest')
        ),
        tags: ['Authentication'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'User logged in successfully',
                content: new OA\JsonContent(ref: '#/components/schemas/LoginResource')
            ),
            new OA\Response(response: 401, description: 'Unauthorized')
        ]
    )]
    public function login(LoginRequest $request)
    {
        $validated = $request->safe()->only('email', 'password');

        if (!Auth::attempt($validated)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'user' => new UserResource($user),
        ]);
    }

    #[OA\Get(
        path: '/api/auth/me',
        operationId: "me",
        summary: 'Get authenticated user details',
        security: [new OA\SecurityScheme('bearerAuth')],
        tags: ['Authentication'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Current user information',
                content: new OA\JsonContent(ref: '#/components/schemas/UserResource')
            ),
            new OA\Response(response: 401, description: 'Unauthorized')
        ]
    )]
    public function me(Request $request)
    {
        return new UserResource($request->user());
    }

    #[OA\Post(
        path: '/api/auth/logout',
        operationId: "logout",
        summary: 'Logout the user',
        security: [new OA\SecurityScheme('bearerAuth')],
        tags: ['Authentication'],
        responses: [
            new OA\Response(response: 200, description: 'Logged out successfully'),
            new OA\Response(response: 401, description: 'Unauthorized')
        ]
    )]
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}
