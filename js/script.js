const tokenCookieName = "accesstoken";
const RoleCookieName = "role"
const btnSignOut = document.getElementById("signout_btn");

btnSignOut.addEventListener("click", signout);

function showAndHideElementsForRoles()
{
    const userConnected = isConnected();
    const role = getRoles();

    let allElementToEdit = document.querySelectorAll('[data-show]');

    allElementToEdit.forEach(element =>{
        switch(element.dataset.show){
            case 'disconnected' :
                if(userConnected)
                {
                    element.classList.add("d-none")
                }
                break;
            case 'connected' :
                if(!userConnected)
                {
                    element.classList.add("d-none");
                }
                break;
            case 'admin' :
                if(!userConnected || role != 'admin')
                {
                    element.classList.add("d-none");
                }
                break;
            case 'client' :
                if(!userConnected || role != 'client')
                {
                    element.classList.add("d-none");
                }
                break;
        }
    })
}

function getRoles()
{
    return getCookie(RoleCookieName);
}

function signout()
{
    eraseCookie(tokenCookieName);
    eraseCookie(RoleCookieName);
    window.location.reload();
}

function setToken(token)
{
    setCookie(tokenCookieName, token, 7);
}

function getToken()
{
    return getCookie(tokenCookieName);
}

function setCookie(name,value,days) 
{
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) 
{
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(const element of ca) {
        let c = element;
        while (c.startsWith(' ')) c = c.substring(1,c.length);
        if (c.startsWith(nameEQ)) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) 
{   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function isConnected()
{
    if(getToken() == null || getToken == undefined)
    {
        return false;
    }
    else{
        return true;
    }
}

function sanitizeHtml(text){
    // Créez un élément HTML temporaire de type "div"
    const tempHtml = document.createElement('div');
    
    // Affectez le texte reçu en tant que contenu texte de l'élément "tempHtml"
    tempHtml.textContent = text;
    
    // Utilisez .innerHTML pour récupérer le contenu de "tempHtml"
    // Cela va "neutraliser" ou "échapper" tout code HTML potentiellement malveillant
    return tempHtml.innerHTML;
}