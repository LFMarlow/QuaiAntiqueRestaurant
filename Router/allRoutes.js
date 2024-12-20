import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", [], "/js/home.js"),
    new Route("/galerie", "La galerie", "/pages/galerie.html", [], "/js/galerie.js"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", ["disconnected"], "/js/auth/signin.js"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html", ["disconnected"], "/js/auth/signup.js"),
    new Route("/account", "Mon compte", "/pages/auth/account.html", ["client"], "/js/auth/account.js"),
    new Route("/account_admin", "Mon compte", "/pages/auth/account_admin.html", ["admin"], "/js/auth/account_admin.js"),
    new Route("/editPassword", "Changement de mot de passe", "/pages/auth/editPassword.html", ["client", "admin"]),
    new Route("/allResa", "Toutes les réservations", "/pages/reservations/allResa.html", ["admin"], "/js/reservations.js"),
    new Route("/reserver", "Réserver", "/pages/reservations/reserver.html", ["client"], "/js/auth/save_reservations.js"),
    new Route("/carte", "Menu du Restaurant", "/pages/carte.html", [], "/js/carte.js"),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";