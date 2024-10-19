<?php
// Activer l'affichage des erreurs pour le débogage
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
include 'db.php'; // Inclure la connexion à la base de données

// Récupérer les données POST (email et mot de passe)
$email = $_POST['email'];
$password = $_POST['password'];

// Préparer et exécuter la requête SQL pour récupérer l'utilisateur
$sql = "SELECT * FROM utilisateurs WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    // Vérifier le mot de passe avec password_verify
    if ($password === $user['password']) {
        // Connexion réussie
        $_SESSION['user_id'] = $user['id'];  // Stocker l'ID de l'utilisateur en session
        $_SESSION['role'] = $user['role'];   // Stocker le rôle de l'utilisateur
        $_SESSION['logged_in'] = true;       // Indiquer que l'utilisateur est connecté
        
        // Retourner une réponse JSON indiquant que la connexion a réussi
        echo json_encode([
            'status' => 'success',
            'role' => $user['role']
        ]);
    } else {
        // Mot de passe incorrect
        echo json_encode(['status' => 'error', 'message' => 'Mot de passe incorrect']);
    }
} else {
    // Aucun utilisateur trouvé avec cet email
    echo json_encode(['status' => 'error', 'message' => 'Aucun utilisateur trouvé avec cet email']);
}

$stmt->close();
$conn->close();
?>
