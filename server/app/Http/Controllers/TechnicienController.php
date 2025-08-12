<?php

namespace App\Http\Controllers;

use App\Models\Technicien;
use Illuminate\Http\Request;

class TechnicienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $techniciens = Technicien::all();
        return view('techniciens.index', compact('techniciens'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return view('techniciens.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'specialite' => 'required|string|max:255',
        ]);

        Technicien::create($request->all());

        return redirect()->route('techniciens.index')->with('success', 'Technicien ajouté.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $technicien = Technicien::findOrFail($id);
        return view('techniciens.show', compact('technicien'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $technicien = Technicien::findOrFail($id);
        return view('techniciens.edit', compact('technicien'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $technicien = Technicien::findOrFail($id);

        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'specialite' => 'required|string|max:255',
        ]);

        $technicien->update($request->all());

        return redirect()->route('techniciens.index')->with('success', 'Technicien mis à jour.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $technicien = Technicien::findOrFail($id);
        $technicien->delete();

        return redirect()->route('techniciens.index')->with('success', 'Technicien supprimé.');
    }
}
