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

