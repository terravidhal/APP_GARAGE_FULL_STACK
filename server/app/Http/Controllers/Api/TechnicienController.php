<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Technicien;
use Illuminate\Http\Request;

class TechnicienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $techniciens = Technicien::all();
        return response()->json($techniciens);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'specialite' => 'required|string|max:255',
        ]);

        $technicien = Technicien::create($request->all());

        return response()->json($technicien, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $technicien = Technicien::findOrFail($id);
        return response()->json($technicien);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $technicien = Technicien::findOrFail($id);

        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'specialite' => 'required|string|max:255',
        ]);

        $technicien->update($request->all());

        return response()->json($technicien);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $technicien = Technicien::findOrFail($id);
        $technicien->delete();

        return response()->json(['message' => 'Technicien supprimé avec succès.']);
    }
}
