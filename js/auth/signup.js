// Récupération de l'ID de chaque champ
const nomUser = document.getElementById("NomInput");
const prenomUser = document.getElementById("PrenomInput");
const emailUser = document.getElementById("EmailInput");
const passwordUser = document.getElementById("PasswordInput");
const validatePasswordUser = document.getElementById("ValidatePasswordInput");
const allergiesUser = document.getElementById("AllergiesInput");
const convivesUser = document.getElementById("NbConvivesInput");

// Récupération du bouton de soumission du formulaire
const submitButton = document.querySelector("form button[type='submit']");

// Ajouter un écouteur d'événement au formulaire pour l'envoi
submitButton.addEventListener("click", function (e) {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Récupération des valeurs des champs du formulaire
    const nom = nomUser.value.trim();
    const prenom = prenomUser.value.trim();
    const email = emailUser.value.trim();
    const password = passwordUser.value;
    const passwordConfirm = validatePasswordUser.value;
    const allergies = allergiesUser ? allergiesUser.value.trim() : "";
    const nombreDeConvives = convivesUser ? parseInt(convivesUser.value) : 1;

    // Validation des champs
    if (!validateForm()) {
        alert("Veuillez remplir correctement tous les champs.");
        return;
    }

    // Création de l'objet contenant les données du formulaire
    const formData = new FormData();
    formData.append("Nom", nom);
    formData.append("Prenom", prenom);
    formData.append("Email", email);
    formData.append("Password", password);
    formData.append("PasswordConfirm", passwordConfirm);
    formData.append("Allergies", allergies);
    formData.append("NbConvives", nombreDeConvives);

    // Envoi des données avec fetch à signup.php
    fetch("../../includes/signup.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            // Afficher un message de succès et rediriger vers la page de connexion
            alert(data.message);
            window.location.href = "/signin"; // Rediriger vers la page de connexion
        } else {
            // Afficher le message d'erreur
            alert(data.message);
        }
    })
    .catch(error => {
        console.error("Erreur lors de l'inscription :", error);
        alert("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
    });
});

// Fonction pour déterminer si les champs sont vides ou remplis
function validateForm() {
    validateRequired(nomUser);
    validateRequired(prenomUser);
    validateEmailUser(emailUser);
    validatePassword(passwordUser);
    validateTwoPassword(passwordUser, validatePasswordUser);

    // Retourne true si tous les champs sont valides
    return (
        validateRequired(nomUser) &&
        validateRequired(prenomUser) &&
        validateEmailUser(emailUser) &&
        validatePassword(passwordUser) &&
        validateTwoPassword(passwordUser, validatePasswordUser)
    );
}

// Fonction pour vérifier si un champ est rempli
function validateRequired(input){
    if(input.value.trim() !== ''){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Fonction pour valider le champ email
function validateEmailUser(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(input.value.trim())) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Fonction pour valider le mot de passe (au moins 8 caractères, avec majuscule, minuscule, chiffre, et caractère spécial)
function validatePassword(input) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    if (passwordRegex.test(input.value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Fonction pour vérifier si les deux mots de passe correspondent
function validateTwoPassword(inputPassword, inputValidatePassword) {
    if (inputPassword.value === inputValidatePassword.value) {
        inputValidatePassword.classList.add("is-valid");
        inputValidatePassword.classList.remove("is-invalid");
        return true;
    } else {
        inputValidatePassword.classList.remove("is-valid");
        inputValidatePassword.classList.add("is-invalid");
        return false;
    }
}
