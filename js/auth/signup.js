//Récupération de l'ID de chaque champs
const nomUser = document.getElementById("NomInput");
const prenomUser = document.getElementById("PrenomInput");
const emailUser = document.getElementById("EmailInput");
const passwordUser = document.getElementById("PasswordInput");
const validatePasswordUser = document.getElementById("ValidatePasswordInput");

//Event d'écoute pour savoir si les champs sont vides ou remplis
nomUser.addEventListener("keyup", validateForm);
prenomUser.addEventListener("keyup", validateForm);
emailUser.addEventListener("keyup", validateForm);
passwordUser.addEventListener("keyup", validateForm);
validatePasswordUser.addEventListener("keyup", validateForm);

//Fonction pour déterminer si les champs sont vides ou remplis
function validateForm()
{
    validateRequired(nomUser);
    validateRequired(prenomUser);
    validateEmailUser(emailUser);
    validatePassword(passwordUser);
    validateTwoPassword(passwordUser, validatePasswordUser);
}

//Applique "is-valid" si le champ est rempli ou "is-invalid" si il est vide
function validateRequired(input){
    if(input.value != ''){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

//Applique "is-valid" si le champ "Email" est rempli ou "is-invalid" si il est vide
function validateEmailUser(input)
{
    //Vérification de caractère avant et après le "@"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const matchEmailUser = input.value;

    if(matchEmailUser.match(emailRegex))
    {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

//Vérification de la validation du mot de passe
function validatePassword(input)
{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const matchPasswordUser = input.value;

    if(matchPasswordUser.match(passwordRegex))
    {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

//Vérification de la correspondance des 2 mot de passe
function validateTwoPassword(inputPassword, inputValidatePassword)
{
    if(inputPassword.value === inputValidatePassword.value)
    {
        inputValidatePassword.classList.add("is-valid");
        inputValidatePassword.classList.remove("is-invalid");
        return true;
    }
    else{
        inputValidatePassword.classList.remove("is-valid");
        inputValidatePassword.classList.add("is-invalid");
        return false;
    }
}

