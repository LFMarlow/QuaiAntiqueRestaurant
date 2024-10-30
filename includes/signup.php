<?php
session_start();
include 'db.php'; // Inclure le fichier de connexion à la base de données

// Vérifier si la requête est envoyée via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $nom = trim($_POST['Nom']);
    $prenom = trim($_POST['Prenom']);
    $email = trim($_POST['Email']);
    $password = $_POST['Password'];
    $passwordConfirm = $_POST['PasswordConfirm'];
    $allergies = isset($_POST['Allergies']) ? trim($_POST['Allergies']) : NULL;
    $nombre_de_convives_habituel = isset($_POST['NbConvives']) ? (int)$_POST['NbConvives'] : 1;

    // Validation des données (vous pouvez ajouter d'autres validations si nécessaire)
    if (empty($nom) || empty($prenom) || empty($email) || empty($password) || empty($passwordConfirm)) {
        echo json_encode(['status' => 'error', 'message' => 'Tous les champs obligatoires doivent être remplis.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Adresse email invalide.']);
        exit;
    }

    if ($password !== $passwordConfirm) {
        echo json_encode(['status' => 'error', 'message' => 'Les mots de passe ne correspondent pas.']);
        exit;
    }

    // Vérifier si l'utilisateur existe déjà
    $stmt = $conn->prepare("SELECT id FROM utilisateurs WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Un compte avec cet email existe déjà.']);
        exit;
    }
    $stmt->close();

    // Hasher le mot de passe
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Insérer le nouvel utilisateur dans la base de données
    $stmt = $conn->prepare("INSERT INTO utilisateurs (nom, prenom, allergies, nombre_de_convives_habituel, email, password, role, date_creation) VALUES (?, ?, ?, ?, ?, ?, 'client', NOW())");
    $stmt->bind_param("sssiss", $nom, $prenom, $allergies, $nombre_de_convives_habituel, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Utilisateur créé avec succès.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la création du compte utilisateur.']);
    }

    $stmt->close();
}

$conn->close();
?>
