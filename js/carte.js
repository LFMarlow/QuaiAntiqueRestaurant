fetch('/includes/get_menus.php')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur réseau lors de la récupération des menus');
    }
    return response.json();
  })
  .then(data => {
    const menuLeft = document.getElementById('menu-left');
    const menuRightPlats = document.getElementById('menu-right-plats');
    const menuRightDesserts = document.getElementById('menu-right-desserts');

    data.forEach(item => {
      const menuItem = document.createElement('div');

      // Crée des éléments séparés pour éviter les risques XSS
      const title = document.createElement('h3');
      title.textContent = item.title;

      const description = document.createElement('p');
      description.textContent = `${item.description} - `;

      const price = document.createElement('strong');
      price.textContent = `${item.price}€`;

      // Ajoute les éléments au conteneur
      description.appendChild(price);
      menuItem.appendChild(title);
      menuItem.appendChild(description);

      // Sépare les menus par catégorie
      if (item.category === 'entrees') {
        menuLeft.appendChild(menuItem);
      } else if (item.category === 'plats') {
        menuRightPlats.appendChild(menuItem);
      } else if (item.category === 'desserts') {
        menuRightDesserts.appendChild(menuItem);
      }
    });
  })
  .catch(error => {
    console.error('Erreur lors du chargement des menus:', error);
    alert("Une erreur s'est produite lors du chargement des menus.");
  });
