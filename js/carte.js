// Données des entrées
const entrees = [
    { title: "Salade de chèvre chaud", description: "Salade fraîche avec du fromage de chèvre local.", price: "12€" },
    { title: "Soupe à l'oignon", description: "Soupe à l'oignon gratinée avec du fromage fondant.", price: "10€" }
];
  
// Données des plats
const plats = [
    { title: "Fondue Savoyarde", description: "Fondue traditionnelle avec trois fromages locaux.", price: "20€" },
    { title: "Filet de boeuf", description: "Tendre filet de boeuf servi avec une sauce au vin rouge.", price: "28€" }
];
  
// Données des desserts
const desserts = [
    { title: "Tarte aux myrtilles", description: "Tarte maison aux myrtilles avec une base croquante.", price: "8€" },
    { title: "Crème brûlée", description: "Crème brûlée à la vanille avec une croûte de sucre caramelisée.", price: "9€" }
];
  
// Fonction pour afficher les entrées dans la page gauche
function displayLeftPage() {
    const leftPage = document.getElementById('menu-left');
    
    entrees.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description} - <strong>${item.price}</strong></p>
      `;
      leftPage.appendChild(menuItem);
    });
}
  
// Fonction pour afficher les plats dans la section des plats (page droite)
function displayRightPagePlats() {
    const rightPagePlats = document.getElementById('menu-right-plats');
  
    plats.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description} - <strong>${item.price}</strong></p>
      `;
      rightPagePlats.appendChild(menuItem);
    });
}
  
// Fonction pour afficher les desserts dans la section des desserts (page droite)
function displayRightPageDesserts() {
    const rightPageDesserts = document.getElementById('menu-right-desserts');
  
    desserts.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description} - <strong>${item.price}</strong></p>
      `;
      rightPageDesserts.appendChild(menuItem);
    });
}
  
// Charger les différentes sections lors du chargement de la page
displayLeftPage();           // Affiche les entrées
displayRightPagePlats();      // Affiche les plats
displayRightPageDesserts();   // Affiche les desserts

  