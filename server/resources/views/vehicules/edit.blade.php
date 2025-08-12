@extends('layout')

@section('content')
<h2>{{ isset($vehicule) ? 'Modifier' : 'Ajouter' }} un véhicule</h2>

<form method="POST" action="{{ isset($vehicule) ? route('vehicules.update', $vehicule) : route('vehicules.store') }}">
    @csrf
    @if(isset($vehicule)) @method('PUT') @endif

    @foreach(['immatriculation', 'marque', 'modele', 'couleur', 'annee', 'kilometrage', 'carosserie', 'energie', 'boite'] as $field)
        <div class="mb-2">
            <label>{{ ucfirst($field) }}</label>
            <input type="{{ $field == 'annee' || $field == 'kilometrage' ? 'number' : 'text' }}"
                   name="{{ $field }}" class="form-control"
                   value="{{ old($field, $vehicule->$field ?? '') }}" required>
        </div>
    @endforeach

    <button class="btn btn-success mt-2">Enregistrer</button>
</form>
@endsection