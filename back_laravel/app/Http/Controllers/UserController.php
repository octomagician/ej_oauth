<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'nombre' => 'required',
            'correo' => 'required|email|unique:users,email|max:255',
            'contraseña' => 'required|min:8',
        ]);

        $user = User::create([
            'name' => $validateData['nombre'],
            'email' => $validateData['correo'],
            'password' => Hash::make($validateData['contraseña']), 
        ]);

        return response()->json([
            'mensaje' => 'Usuario registrado con éxito.',
            'usuario' => $user,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
