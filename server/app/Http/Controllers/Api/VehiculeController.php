<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicule;
use Illuminate\Http\Request;

class VehiculeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vehicules = Vehicule::all();
        return response()->json($vehicules);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'immatriculation' => 'required|string|unique:vehicules',
            'marque' => 'required|string',
            'modele' => 'required|string',
            'couleur' => 'required|string',
            'annee' => 'required|integer',
            'kilometrage' => 'required|integer',
            'carosserie' => 'required|string',
            'energie' => 'required|string',
            'boite' => 'required|string',
        ]);

        $vehicule = Vehicule::create($request->all());

        return response()->json($vehicule, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $vehicule = Vehicule::findOrFail($id);
        return response()->json($vehicule);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $vehicule = Vehicule::findOrFail($id);

        $request->validate([
            'immatriculation' => 'required|string|unique:vehicules,immatriculation,' . $vehicule->id,
            'marque' => 'required|string',
            'modele' => 'required|string',
            'couleur' => 'required|string',
            'annee' => 'required|integer',
            'kilometrage' => 'required|integer',
            'carosserie' => 'required|string',
            'energie' => 'required|string',
            'boite' => 'required|string',
        ]);

        $vehicule->update($request->all());

        return response()->json($vehicule);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $vehicule = Vehicule::findOrFail($id);
        $vehicule->delete();

        return response()->json(['message' => 'Véhicule supprimé avec succès.']);
    }
}
