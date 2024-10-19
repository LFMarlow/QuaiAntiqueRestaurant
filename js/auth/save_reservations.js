    // Horaires pour Midi et Soir
    const horairesMidi = ["12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30"];
    const horairesSoir = ["19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00"];

    // Sélectionner les radios et le select pour les horaires
    const midiRadio = document.getElementById("midiRadio");
    const soirRadio = document.getElementById("soirRadio");
    const selectHour = document.getElementById("selectHour");

    // Fonction pour mettre à jour les options du select
    function updateHeureOptions(horaires) {
        // Effacer toutes les options actuelles
        selectHour.innerHTML = "";
        // Ajouter les nouvelles options
        horaires.forEach(heure => {
            const option = document.createElement("option");
            option.value = heure;
            option.textContent = heure;
            selectHour.appendChild(option);
        });
    }

    // Mettre à jour les horaires par défaut en fonction de l'état initial
    if (soirRadio.checked) {
        updateHeureOptions(horairesSoir);  // Par défaut, c'est le soir qui est sélectionné
    } else if (midiRadio.checked) {
        updateHeureOptions(horairesMidi);  // Si midi est sélectionné
    }

    // Ajouter un événement lorsque le radio "Midi" est sélectionné
    midiRadio.addEventListener("change", function() {
        if (this.checked) {
            updateHeureOptions(horairesMidi);
        }
    });

    // Ajouter un événement lorsque le radio "Soir" est sélectionné
    soirRadio.addEventListener("change", function() {
        if (this.checked) {
            updateHeureOptions(horairesSoir);
        }
    });


    // Récupérer les informations de l'utilisateur connecté
    fetch('../../includes/get_user_infos.php')
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Récupérer les informations de l'utilisateur et remplir le formulaire
            const user = data.user;
            document.getElementById('NomInput').value = user.nom;
            document.getElementById('PrenomInput').value = user.prenom;
            document.getElementById('AllergieInput').value = user.allergies;
            document.getElementById('NbConvivesInput').value = user.nombre_de_convives_habituel;
        } else {
            console.error("Erreur lors de la récupération des informations :", data.message);
            // Rediriger vers la page de connexion si non connecté
            window.location.href = "/login";
        }
    })
    .catch(error => {
    console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
});


document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Empêcher le rechargement classique de la page lors de la soumission

    // Récupérer les valeurs du formulaire
    const nom = document.getElementById('NomInput').value;
    const prenom = document.getElementById('PrenomInput').value;
    const allergies = document.getElementById('AllergieInput').value;
    const nbConvives = document.getElementById('NbConvivesInput').value;
    const date = document.getElementById('DateInput').value;
    const heure = document.getElementById('selectHour').value;
    const serviceChoisi = document.querySelector('input[name="serviceChoisi"]:checked').id === 'midiRadio' ? 'midi' : 'soir';

    // Créer un objet FormData pour envoyer les données au serveur
    const formData = new FormData();
    formData.append('Nom', nom);
    formData.append('Prenom', prenom);
    formData.append('Allergies', allergies);
    formData.append('NbConvives', nbConvives);
    formData.append('Date', date);
    formData.append('Heure', heure);
    formData.append('serviceChoisi', serviceChoisi);

    // Envoi de la requête AJAX vers le fichier PHP
    fetch('../../includes/save_reservations.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert("Réservation enregistrée avec succès !");
            // Vous pouvez rediriger vers une page de confirmation ou réinitialiser le formulaire
        } else {
            alert("Erreur lors de la réservation : " + data.message);
        }
    })
    .catch(error => {
        console.error("Erreur lors de l'enregistrement de la réservation :", error);
        alert("Une erreur est survenue. Veuillez réessayer plus tard.");
    });
});
