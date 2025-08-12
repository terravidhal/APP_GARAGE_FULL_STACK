<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Garage Manager</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f5f5f5;
        }
        .centered {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .btn-lg {
            width: 200px;
            margin: 10px;
        }
    </style>
</head>
<body>
    <div class="centered text-center">
        <h1 class="mb-4">🚗 Application de gestion du garage</h1>

        <div>
            <a href="{{ route('vehicules.index') }}" class="btn btn-primary btn-lg">Véhicules</a>
            <a href="{{ route('reparations.index') }}" class="btn btn-success btn-lg">Réparations</a>
            <a href="{{ route('techniciens.index') }}" class="btn btn-info btn-lg">Techniciens</a>
        </div>
    </div>
</body>
</html>