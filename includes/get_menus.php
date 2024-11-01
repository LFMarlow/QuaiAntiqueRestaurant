<?php
// Activer l'affichage des erreurs pour le débogage
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Inclure la connexion à la base de données
include '../includes/db.php';

try {
    // Exécuter la requête pour récupérer les menus
    $sql = "SELECT id, title, description, price, category FROM menus";
    $result = $conn->query($sql);

    // Vérifier s'il y a des résultats
    if ($result === false) {
        throw new Exception("Erreur SQL : " . $conn->error);
    }

    $menus = [];
    while ($row = $result->fetch_assoc()) {
        $menus[] = $row;
    }

    // Définir le type de contenu en tant que JSON
    header('Content-Type: application/json');
    
    // Envoyer les données en JSON
    echo json_encode($menus);

} catch (Exception $e) {
    
    // Gestion des erreurs : retourner un message JSON en cas de problème
    header('Content-Type: application/json');
    echo json_encode(["error" => "Erreur lors de la récupération des données : " . $e->getMessage()]);
} finally {

    // Fermer la connexion
    $conn->close();
}
