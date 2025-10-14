<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function ingresar(Request $request){
        $validateData = $request->validate([
            'correo' => 'required|email|max:255',
            'contraseña' => 'required|min:8',
        ]);
        
        $user = User::where('email', $request->correo)->first();

        if ($user && Hash::check($request->contraseña, $user->password) ) {
                return response()->json([
                    'mensaje' => 'Inicio de sesión exitoso',
                    'token' => $user->createToken($user->email)->plainTextToken
                ], 200);
        } else {
            return response()->json([
                'mensaje' => 'Credenciales incorrectas'
            ], 401);
        }
    }

    public function salir(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'mensaje' => 'Sesión cerrada correctamente'
        ], 200);
    }
}
