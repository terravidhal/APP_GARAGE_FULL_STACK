<?php

namespace App\Http\Controllers;

use App\Models\Vehicule;
use Illuminate\Http\Request;

class VehiculeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $vehicules = Vehicule::all();
        return view('vehicules.index', compact('vehicules'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return view('vehicules.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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

        Vehicule::create($request->all());

        return redirect()->route('vehicules.index')->with('success', 'Véhicule ajouté.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $vehicule = Vehicule::findOrFail($id);
        return view('vehicules.show', compact('vehicule'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $vehicule = Vehicule::findOrFail($id);
        return view('vehicules.edit', compact('vehicule'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        // On récupère le véhicule par son ID
        $vehicule = Vehicule::findOrFail($id);

        // Validation
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

        // Mise à jour
        $vehicule->update($request->all());

        // Redirection
        return redirect()->route('vehicules.index')
            ->with('success', 'Véhicule mis à jour.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $vehicule = Vehicule::findOrFail($id);
        $vehicule->delete();

        return redirect()->route('vehicules.index')
            ->with('success', 'Véhicule supprimé.');
    }
}
