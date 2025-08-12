@extends('layout')

@section('content')
<h2>Liste des véhicules</h2>
<a href="{{ url('/') }}" class="btn btn-secondary mb-3">🏠 Retour à l'accueil</a>
<a href="{{ route('vehicules.create') }}" class="btn btn-primary mb-3">Ajouter</a>

<table class="table">
    <thead>
        <tr>
            <th>Immatriculation</th><th>Marque</th><th>Modèle</th><th>Actions</th>
        </tr>
    </thead>
    <tbody>
        @foreach($vehicules as $v)
            <tr>
                <td>{{ $v->immatriculation }}</td>
                <td>{{ $v->marque }}</td>
                <td>{{ $v->modele }}</td>
                <td>
                    <a href="{{ route('vehicules.edit', $v) }}" class="btn btn-warning btn-sm">Modifier</a>
                    <form action="{{ route('vehicules.destroy', $v) }}" method="POST" style="display:inline">
                        @csrf @method('DELETE')
                        <button class="btn btn-danger btn-sm">Supprimer</button>
                    </form>
                </td>
            </tr>
        @endforeach
    </tbody>
</table>
@endsection