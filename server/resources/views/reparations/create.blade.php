@extends('layout')

@section('content')
<h2>{{ isset($reparation) ? 'Modifier' : 'Ajouter' }} une réparation</h2>

<form method="POST" action="{{ isset($reparation) ? route('reparations.update', $reparation) : route('reparations.store') }}">
    @csrf
    @if(isset($reparation)) @method('PUT') @endif

    <div class="mb-2">
        <label>Véhicule</label>
        <select name="vehicule_id" class="form-control" required>
            @foreach($vehicules as $v)
                <option value="{{ $v->id }}" @selected(isset($reparation) && $reparation->vehicule_id == $v->id)>
                    {{ $v->immatriculation }}
                </option>
            @endforeach
        </select>
    </div>

    <div class="mb-2">
        <label>Date</label>
        <input type="date" name="date" class="form-control" value="{{ old('date', $reparation->date ?? '') }}" required>
    </div>

    <div class="mb-2">
        <label>Durée main d'œuvre</label>
        <input type="text" name="duree_main_oeuvre" class="form-control" value="{{ old('duree_main_oeuvre', $reparation->duree_main_oeuvre ?? '') }}" required>
    </div>

    <div class="mb-2">
        <label>Objet de la réparation</label>
        <textarea name="objet_reparation" class="form-control" required>{{ old('objet_reparation', $reparation->objet_reparation ?? '') }}</textarea>
    </div>

    <div class="mb-2">
        <label>Techniciens</label>
        @foreach($techniciens as $t)
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="techniciens[]" value="{{ $t->id }}"
                       @checked(isset($selectedTechniciens) && in_array($t->id, $selectedTechniciens))>
                <label class="form-check-label">{{ $t->prenom }} {{ $t->nom }}</label>
            </div>
        @endforeach
    </div>

    <button class="btn btn-success mt-2">Enregistrer</button>
</form>
@endsection