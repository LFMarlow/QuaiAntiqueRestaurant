<?php
include 'db.php';
session_start();

header('Content-Type: application/json');

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'saveOrUpdateMenu':
        $id = $_POST['id'] ?? null; // On récupère l'id s'il est présent
        $title = $_POST['title'];
        $description = $_POST['description'];
        $price = $_POST['price'];
        $category = $_POST['category'];

        if ($title) {
            // Vérifier si le menu existe déjà
            $stmt = $conn->prepare("SELECT * FROM menus WHERE title = ?");
            $stmt->bind_param("i", $title);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                // Le menu existe, on le met à jour en fonction du titre
                $stmt = $conn->prepare("UPDATE menus SET title = ?, description = ?, price = ?, category = ? WHERE title = ?");
                $stmt->bind_param("ssdss", $title, $description, $price, $category, $title);
                $stmt->execute();
                echo json_encode(['message' => 'Menu mis à jour avec succès.']);
            } else {
                // Le menu n'existe pas, on le crée
                $stmt = $conn->prepare("INSERT INTO menus (title, description, price, category) VALUES (?, ?, ?, ?)");
                $stmt->bind_param("ssds", $title, $description, $price, $category);
                $stmt->execute();
                echo json_encode(['message' => 'Menu ajouté avec succès.']);
            }
        }
        break;

    case 'getMenus':
        $result = $conn->query("SELECT * FROM menus");
        $menus = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode(['menus' => $menus]);
        break;

    case 'getMenu':
        $id = $_GET['id'];
        $stmt = $conn->prepare("SELECT * FROM menus WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $menu = $stmt->get_result()->fetch_assoc();
        echo json_encode(['menu' => $menu]);
        break;

    case 'deleteMenu':
        $title = $_POST['title'];
        $stmt = $conn->prepare("DELETE FROM menus WHERE title = ?");
        $stmt->bind_param("s", $title);
        $stmt->execute();
        echo json_encode(['message' => "Menu supprimé avec succès."]);
        break;

    case 'getReservations':
        $result = $conn->query("SELECT r.id, r.date_reservation, r.heure_reservation, u.nom AS nom_client, u.prenom AS prenom_client 
                                 FROM reservations r JOIN utilisateurs u ON r.user_id = u.id ORDER BY date_reservation DESC");
        $reservations = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode(['reservations' => $reservations]);
        break;

    case 'deleteReservation':
        $id = $_POST['id'];
        $stmt = $conn->prepare("DELETE FROM reservations WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        echo json_encode(['message' => "Réservation supprimée avec succès."]);
        break;

    default:
        echo json_encode(['error' => 'Action non reconnue']);
        break;
}

$conn->close();
?>
