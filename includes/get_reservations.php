<?php
include 'db.php'; // Inclure la connexion à la base de données

// Préparer et exécuter la requête SQL pour récupérer toutes les réservations
$sql = "SELECT nombre_de_couverts, date_reservation, heure_reservation, nom, prenom, allergies FROM reservations ORDER BY date_reservation DESC";
$result = $conn->query($sql);

$reservations = array();

if ($result->num_rows > 0) {
    // Stocker chaque réservation dans un tableau
    while($row = $result->fetch_assoc()) {
        $reservations[] = $row;
    }
}

// Retourner les réservations au format JSON
header('Content-Type: application/json');
echo json_encode($reservations);

$conn->close();
?>
