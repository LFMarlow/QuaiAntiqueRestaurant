<?php
session_start();
include 'db.php'; // Inclure la connexion à la base de données

// Vérifier si l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Utilisateur non connecté']);
    exit;
}

// Récupérer les données POST envoyées via la requête AJAX
$nom = $_POST['Nom'];
$prenom = $_POST['Prenom'];
$allergies = $_POST['Allergies'];
$nombre_de_convives = $_POST['NbConvives'];
$date_reservation = $_POST['Date'];
$heure_reservation = $_POST['Heure'];
$serviceChoisi = isset($_POST['serviceChoisi']) && $_POST['serviceChoisi'] === 'midi' ? 'midi' : 'soir';

// Préparer la requête SQL pour insérer les informations de réservation
$sql = "INSERT INTO reservations (nombre_de_couverts, date_reservation, heure_reservation, nom, prenom, allergies)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("isssss", $nombre_de_convives, $date_reservation, $heure_reservation, $nom, $prenom, $allergies);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Réservation enregistrée avec succès']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Erreur lors de l\'enregistrement de la réservation']);
}

$stmt->close();
$conn->close();
?>
