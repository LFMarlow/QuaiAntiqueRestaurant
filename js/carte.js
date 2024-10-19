// Fonction pour récupérer les menus via PHP et les afficher
fetch('/includes/get_menus.php')
  .then(response => response.json())
  .then(data => {
    const menuLeft = document.getElementById('menu-left');
    const menuRightPlats = document.getElementById('menu-right-plats');
    const menuRightDesserts = document.getElementById('menu-right-desserts');

    data.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.innerHTML = `<h3>${item.title}</h3><p>${item.description} - <strong>${item.price}€</strong></p>`;

      // Séparer les menus par catégorie
      if (item.category === 'entrees') {
        menuLeft.appendChild(menuItem);
      } else if (item.category === 'plats') {
        menuRightPlats.appendChild(menuItem);
      } else if (item.category === 'desserts') {
        menuRightDesserts.appendChild(menuItem);
      }
    });
  })
  .catch(error => console.error('Erreur lors du chargement des menus:', error));

  