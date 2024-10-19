<?php
require_once __DIR__ . '/../vendor/autoload.php'; // Charger Composer

// Charger le fichier .env
$dotenv = Dotenv\Dotenv::createImmutable('../');
$dotenv->load();

// Utiliser les variables d'environnement
$servername = $_ENV['DB_SERVER'];
$username = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];
$dbname = $_ENV['DB_NAME'];

// Connexion à la base de données MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
