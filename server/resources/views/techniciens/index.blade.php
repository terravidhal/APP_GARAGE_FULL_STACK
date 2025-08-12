@extends('layout')

@section('content')
<h2>Techniciens</h2>
<a href="{{ url('/') }}" class="btn btn-secondary mb-3">🏠 Retour à l'accueil</a>
<a href="{{ route('techniciens.create') }}" class="btn btn-primary mb-3">Ajouter</a>

<table class="table">
    <thead>
        <tr><th>Nom</th><th>Prénom</th><th>Spécialité</th><th>Actions</th></tr>
    </thead>
    <tbody>
        @foreach($techniciens as $t)
            <tr>
                <td>{{ $t->nom }}</td>
                <td>{{ $t->prenom }}</td>
                <td>{{ $t->specialite }}</td>
                <td>
                    <a href="{{ route('techniciens.edit', $t) }}" class="btn btn-warning btn-sm">Modifier</a>
                    <form action="{{ route('techniciens.destroy', $t) }}" method="POST" style="display:inline">
                        @csrf @method('DELETE')
                        <button class="btn btn-danger btn-sm">Supprimer</button>
                    </form>
                </td>
            </tr>
        @endforeach
    </tbody>
</table>
@endsection