<?php
// Activer l'affichage des erreurs pour le débogage
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Inclure la connexion à la base de données
include '../includes/db.php';

// Exécuter la requête pour récupérer les menus
$sql = "SELECT * FROM menus";
$result = $conn->query($sql);

// Vérifier s'il y a des résultats
if ($result === false) {
    // Si la requête échoue, afficher l'erreur SQL
    echo json_encode(["error" => $conn->error]);
    exit;
}

$menus = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $menus[] = $row;
    }
}

// Définir le type de contenu en tant que JSON
header('Content-Type: application/json');

// Envoyer les données en JSON
echo json_encode($menus);

$conn->close();
?>
