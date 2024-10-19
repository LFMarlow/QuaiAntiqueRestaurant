
// Envoyer une requête AJAX pour récupérer les réservations
fetch('../includes/get_reservations.php')
    .then(response => response.json())
    .then(data => {
        const reservationList = document.getElementById('reservationList');

        if (data.length > 0) {
            // Pour chaque réservation, créer un élément HTML et l'ajouter à la liste
            data.forEach(reservation => {
                const reservationItem = document.createElement('div');
                reservationItem.classList.add('reservation-item', ('col-md3'));

                reservationItem.innerHTML = `
                        <h5>${reservation.nom} ${reservation.prenom}</h5>
                        <p><strong>Nombre de couverts :</strong> ${reservation.nombre_de_couverts}</p>
                        <p><strong>Date :</strong> ${reservation.date_reservation}</p>
                        <p><strong>Heure :</strong> ${reservation.heure_reservation}</p>
                        <p><strong>Allergies :</strong> ${reservation.allergies ? reservation.allergies : 'Aucune'}</p>
                    `;

                reservationList.appendChild(reservationItem);
            });
        } else {
            // Aucune réservation trouvée
            reservationList.innerHTML = '<p>Aucune réservation disponible.</p>';
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des réservations:', error);
        const reservationList = document.getElementById('reservationList');
        reservationList.innerHTML = '<p>Erreur lors de la récupération des réservations. Veuillez réessayer plus tard.</p>';
    });

