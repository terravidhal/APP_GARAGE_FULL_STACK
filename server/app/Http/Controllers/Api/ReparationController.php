<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reparation;
use Illuminate\Http\Request;

class ReparationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reparations = Reparation::with('vehicule', 'techniciens')->get();
        return response()->json($reparations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'vehicule_id' => 'required|exists:vehicules,id',
            'date' => 'required|date',
            'duree_main_oeuvre' => 'required|string',
            'objet_reparation' => 'required|string',
            'techniciens' => 'array',
        ]);

        $reparation = Reparation::create($request->only('vehicule_id', 'date', 'duree_main_oeuvre', 'objet_reparation'));

        if ($request->has('techniciens')) {
            $reparation->techniciens()->sync($request->input('techniciens'));
        }

        return response()->json($reparation, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $reparation = Reparation::with('vehicule', 'techniciens')->findOrFail($id);
        return response()->json($reparation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $reparation = Reparation::findOrFail($id);

        $request->validate([
            'vehicule_id' => 'required|exists:vehicules,id',
            'date' => 'required|date',
            'duree_main_oeuvre' => 'required|string',
            'objet_reparation' => 'required|string',
            'techniciens' => 'array',
        ]);

        $reparation->update($request->only('vehicule_id', 'date', 'duree_main_oeuvre', 'objet_reparation'));

        if ($request->has('techniciens')) {
            $reparation->techniciens()->sync($request->input('techniciens'));
        }

        return response()->json($reparation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $reparation = Reparation::findOrFail($id);

        $reparation->techniciens()->detach();
        $reparation->delete();

        return response()->json(['message' => 'Réparation supprimée avec succès.']);
    }
}
