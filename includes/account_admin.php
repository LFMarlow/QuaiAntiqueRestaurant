<?php
include 'db.php';
session_start();

header('Content-Type: application/json');

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'saveOrUpdateMenu':
        // Récupération et validation des données entrantes
        $id = isset($_POST['id']) ? filter_var($_POST['id'], FILTER_VALIDATE_INT) : null;
        $title = isset($_POST['title']) ? trim($_POST['title']) : '';
        $description = isset($_POST['description']) ? trim($_POST['description']) : '';
        $price = isset($_POST['price']) ? filter_var($_POST['price'], FILTER_VALIDATE_FLOAT) : 0.0;
        $category = isset($_POST['category']) ? trim($_POST['category']) : '';
    
        // Vérification des champs obligatoires
        if (!$title || !$description || !$category) {
            echo json_encode(['message' => 'Tous les champs sont obligatoires.']);
            exit;
        }
    
        // Vérification de la validité du prix
        if ($price === false || $price < 0) {
            echo json_encode(['message' => 'Le prix doit être un nombre valide.']);
            exit;
        }
    
        // Début de la transaction pour garantir l'intégrité des opérations
        if ($title) {
            $conn->begin_transaction();
            try {
                // Vérifier si le menu existe déjà en fonction du titre
                $stmt = $conn->prepare("SELECT * FROM menus WHERE title = ?");
                $stmt->bind_param("s", $title); 
                $stmt->execute();
                $result = $stmt->get_result();
    
                if ($result->num_rows > 0) {
                    // Le menu existe, donc on effectue une mise à jour
                    $stmt = $conn->prepare("UPDATE menus SET title = ?, description = ?, price = ?, category = ? WHERE title = ?");
                    $stmt->bind_param("ssdss", $title, $description, $price, $category, $title);
                    if ($stmt->execute() === false) throw new Exception('Erreur lors de la mise à jour.');
                    echo json_encode(['message' => htmlspecialchars('Menu mis à jour avec succès.')]);

                } else {
                    // Le menu n'existe pas, on crée une nouvelle entrée
                    $stmt = $conn->prepare("INSERT INTO menus (title, description, price, category) VALUES (?, ?, ?, ?)");
                    $stmt->bind_param("ssds", $title, $description, $price, $category);
                    if ($stmt->execute() === false) throw new Exception('Erreur lors de l\'insertion.');
                    echo json_encode(['message' => htmlspecialchars('Menu ajouté avec succès.')]);
                }
    
                // Valider la transaction si tout s'est bien passé
                $conn->commit();
    
            } catch (Exception $e) {
                // Annuler la transaction en cas d'erreur
                $conn->rollback();
                echo json_encode(['message' => 'Erreur lors de la mise à jour ou de l\'ajout du menu.']);
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
        // Validation et nettoyage de l'entrée
        $title = isset($_POST['title']) ? trim($_POST['title']) : '';
        if ($title === '') {
            echo json_encode(['error' => "Le titre du menu est requis."]);
            exit;
        }

        // Vérification de l'existence du menu avant la suppression
        $stmt = $conn->prepare("SELECT COUNT(*) FROM menus WHERE title = ?");
        $stmt->bind_param("s", $title);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();

        if ($count === 0) {
            echo json_encode(['error' => "Menu non trouvé."]);
            exit;
        }

        // Suppression du menu
        $stmt = $conn->prepare("DELETE FROM menus WHERE title = ?");
        $stmt->bind_param("s", $title);
    
        if ($stmt->execute()) {
            echo json_encode(['message' => "Menu supprimé avec succès."]);
        } else {
            echo json_encode(['error' => "Erreur lors de la suppression du menu."]);
        }
        $stmt->close();
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
