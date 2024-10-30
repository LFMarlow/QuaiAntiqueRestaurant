// Charger les menus et les réservations au chargement de la page
loadMenus();
loadReservations();


// Fonction pour ajouter ou modifier un menu
document.getElementById("plat-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    fetch("../../includes/account_admin.php?action=saveOrUpdateMenu", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        e.target.reset();
        loadMenus();
    });
});

// Fonction pour charger les menus
function loadMenus() {
    fetch("../../includes/account_admin.php?action=getMenus")
    .then(response => response.json())
    .then(data => {
        const menusContainer = document.getElementById("plats-container");
        menusContainer.innerHTML = "";
        data.menus.forEach(menu => {
            menusContainer.innerHTML += `
                <div class="menu-item">
                    <h3>${menu.title} - ${menu.price}€</h3>
                    <p>${menu.description} (Catégorie: ${menu.category})</p>
                    <button onclick="editMenu(${menu.id})">Modifier</button>
                    <button onclick="deleteMenu('${menu.title}')">Supprimer</button>
                </div>`;
        });
    });
}

// Fonction pour modifier un menu (pré-remplit le formulaire)
function editMenu(id) {
    fetch(`../../includes/account_admin.php?action=getMenu&id=${id}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("title").value = data.menu.title;
        document.getElementById("description").value = data.menu.description;
        document.getElementById("price").value = data.menu.price;
        document.getElementById("category").value = data.menu.category;
    });
}

// Fonction pour supprimer un menu
function deleteMenu(title) {
    if (confirm("Voulez-vous vraiment supprimer ce menu ?")) {
        const formData = new FormData();
        formData.append("title", title); // Envoyer le titre

        fetch("../../includes/account_admin.php?action=deleteMenu", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || data.error);
            loadMenus();
        })
        .catch(error => console.error("Erreur lors de la suppression :", error));
    }
}


// Fonction pour charger les réservations
function loadReservations() {
    fetch("../../includes/account_admin.php?action=getReservations")
    .then(response => response.json())
    .then(data => {
        const reservationsContainer = document.getElementById("reservations-container");
        reservationsContainer.innerHTML = "";
        data.reservations.forEach(reservation => {
            reservationsContainer.innerHTML += `
                <div class="reservation-item-admin">
                    <h3>${reservation.nom_client} ${reservation.prenom_client}</h3>
                    <p>${reservation.date_reservation} à ${reservation.heure_reservation}</p>
                    <button onclick="deleteReservation(${reservation.id})">Supprimer</button>
                </div>`;
        });
    });
}

// Fonction pour supprimer une réservation
function deleteReservation(id) {
    if (confirm("Voulez-vous vraiment supprimer cette réservation ?")) {
        const formData = new FormData();
        formData.append("id", id); // Envoyer l'id en tant que donnée POST

        fetch("../../includes/account_admin.php?action=deleteReservation", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || data.error);
            loadReservations(); // Recharger les réservations après suppression
        })
        .catch(error => console.error("Erreur lors de la suppression :", error));
    }
}

