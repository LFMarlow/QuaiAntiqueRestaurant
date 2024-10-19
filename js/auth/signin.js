//Récupération des ID
const buttonSignIn = document.getElementById("BtnSignIn");
const emailUser = document.getElementById("EmailInput");
const passwordUser = document.getElementById("PasswordInput");

const btnSignIn = document.getElementById("BtnSignIn");
btnSignIn.addEventListener("click", function(e) {
    e.preventDefault();

    const email = document.getElementById('EmailInput').value;
    const password = document.getElementById('PasswordInput').value;
    
    // Vérification si les champs sont remplis
    if (!email || !password) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Envoi d'une requête AJAX à login.php
    fetch('../../includes/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        console.log("Réponse du serveur :", data); // Afficher la réponse reçue du serveur
        if (data.status === 'success') {
            console.log("Connexion réussie");
            // Stocker le rôle dans un cookie
            document.cookie = `${RoleCookieName}=${data.role}; path=/; max-age=3600`;
            window.location.href = "/";
        } else {
            // Afficher un message d'erreur si la connexion échoue
            document.querySelector('.invalid-feedback').classList.remove('d-none');
            console.log("Connexion échoué");
        }
    })
    .catch(error => {
        console.error('Erreur lors de la tentative de connexion:', error);
    });
});

// Fonction pour se déconnecter
function signout() {
    document.cookie = `${RoleCookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; // Effacer le cookie
    window.location.href = "/signin"; // Rediriger vers la page de connexion
}

// Fonction pour récupérer un cookie par son nom
function getCookie(name) {
    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}