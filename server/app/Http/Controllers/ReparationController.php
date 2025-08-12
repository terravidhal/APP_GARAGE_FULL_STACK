<?php

namespace App\Http\Controllers;

use App\Models\Reparation;
use App\Models\Technicien;
use App\Models\Vehicule;
use Illuminate\Http\Request;

class ReparationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $reparations = Reparation::with('vehicule', 'techniciens')->get();
        return view('reparations.index', compact('reparations'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $vehicules = Vehicule::all();
        $techniciens = Technicien::all();
        return view('reparations.create', compact('vehicules', 'techniciens'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'vehicule_id' => 'required|exists:vehicules,id',
            'date' => 'required|date',
            'duree_main_oeuvre' => 'required|string',
            'objet_reparation' => 'required|string',
            'techniciens' => 'array',
        ]);

        $reparation = Reparation::create($request->only('vehicule_id', 'date', 'duree_main_oeuvre', 'objet_reparation'));
        $reparation->techniciens()->sync($request->input('techniciens', []));

        return redirect()->route('reparations.index')->with('success', 'Réparation enregistrée.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $reparation = Reparation::findOrFail($id);
        $vehicules = Vehicule::all();
        $techniciens = Technicien::all();
        $selectedTechniciens = $reparation->techniciens->pluck('id')->toArray();

        return view('reparations.show', compact('reparation', 'vehicules', 'techniciens', 'selectedTechniciens'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $reparation = Reparation::findOrFail($id);
        $vehicules = Vehicule::all();
        $techniciens = Technicien::all();
        $selectedTechniciens = $reparation->techniciens->pluck('id')->toArray();

        return view('reparations.edit', compact('reparation', 'vehicules', 'techniciens', 'selectedTechniciens'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $reparation = Reparation::findOrFail($id);

        $request->validate([
            'vehicule_id' => 'required|exists:vehicules,id',
            'date' => 'required|date',
            'duree_main_oeuvre' => 'required|string',
            'objet_reparation' => 'required|string',
            'techniciens' => 'array',
        ]);

        $reparation->update($request->only('vehicule_id', 'date', 'duree_main_oeuvre', 'objet_reparation'));
        $reparation->techniciens()->sync($request->input('techniciens', []));

        return redirect()->route('reparations.index')->with('success', 'Réparation mise à jour.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $reparation = Reparation::findOrFail($id);
        $reparation->techniciens()->detach();
        $reparation->delete();

        return redirect()->route('reparations.index')->with('success', 'Réparation supprimée.');
    }
}
