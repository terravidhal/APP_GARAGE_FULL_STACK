@extends('layout')

@section('content')
<h2>{{ isset($technicien) ? 'Modifier' : 'Ajouter' }} un technicien</h2>

<form method="POST" action="{{ isset($technicien) ? route('techniciens.update', $technicien) : route('techniciens.store') }}">
    @csrf
    @if(isset($technicien)) @method('PUT') @endif

    <div class="mb-2">
        <label>Nom</label>
        <input type="text" name="nom" class="form-control" value="{{ old('nom', $technicien->nom ?? '') }}" required>
    </div>
    <div class="mb-2">
        <label>Prénom</label>
        <input type="text" name="prenom" class="form-control" value="{{ old('prenom', $technicien->prenom ?? '') }}" required>
    </div>
    <div class="mb-2">
        <label>Spécialité</label>
        <input type="text" name="specialite" class="form-control" value="{{ old('specialite', $technicien->specialite ?? '') }}" required>
    </div>

    <button class="btn btn-success mt-2">Enregistrer</button>
</form>
@endsection