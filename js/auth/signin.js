//Récupération des ID
const buttonSignIn = document.getElementById("BtnSignIn");
const emailUser = document.getElementById("EmailInput");
const passwordUser = document.getElementById("PasswordInput");

//Ajout d'une écoute pour savoir si un click sur le bouton est réalisé
buttonSignIn.addEventListener("click", checkCredentials);

//Fonction de connexion
function checkCredentials()
{
    if(emailUser.value == "test@mail.com" && passwordUser.value == "123"){
        //Il faudra récupérer le vrai token
        const token = "lkjsdngfljsqdnglkjsdbglkjqskjgkfjgbqslkfdgbskldfgdfgsdgf";
        setToken(token);
        //placer ce token en cookie

        setCookie(RoleCookieName, "admin", 7);
        window.location.replace("/");
    }
    else{
        emailUser.classList.add("is-invalid");
        passwordUser.classList.add("is-invalid");
    }
}