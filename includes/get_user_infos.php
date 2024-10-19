<?php
session_start();
include 'db.php'; // Inclure la connexion à la base de données

// Vérifier si l'utilisateur est connecté en vérifiant la session
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Utilisateur non connecté']);
    exit;
}

// Récupérer l'ID de l'utilisateur depuis la session
$user_id = $_SESSION['user_id'];

// Préparer et exécuter la requête pour récupérer les informations de l'utilisateur
$sql = "SELECT nom, prenom, allergies, nombre_de_convives_habituel FROM utilisateurs WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    // Retourner les informations de l'utilisateur au format JSON
    echo json_encode([
        'status' => 'success',
        'user' => $user
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Utilisateur non trouvé']);
}

$stmt->close();
$conn->close();
?>
