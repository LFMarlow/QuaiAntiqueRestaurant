// Reservation form submission handler
document.getElementById("reservationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const guests = document.getElementById("guests").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
  //  const allergies = document.getElementById("allergies").value;
  
    alert(`Réservation confirmée pour ${guests} personnes le ${date} à ${time}.`);
  });
  
  // Dynamic Dishes (Menu)
  const dishes = [
    { 
      category: "Entrées", 
      title: "Salade Savoyarde", 
      price: "12€", 
      image: "../images/Salade-savoyarde.jpg" 
    },
    { 
      category: "Plats", 
      title: "Fondue Savoyarde", 
      price: "22€", 
      image: "../images/fondue.jpg" 
    },
    { 
      category: "Desserts", 
      title: "Tarte aux Myrtilles", 
      price: "8€", 
      image: "../images/tarte-myrtilles.jpg" 
    },
  ];
  
  const dishesDiv = document.getElementById('dishes');

  dishes.forEach(dish => {
    const dishElement = document.createElement('div');
    dishElement.classList.add('col-md-4');
    
    // Ajout de l'image et des détails du plat
    dishElement.innerHTML = `
      <div class="card">
        <img src="${dish.image}" class="card-img-top" alt="${dish.title}">
        <div class="card-body">
          <h5 class="card-title">${dish.category}</h5>
          <p class="card-text">${dish.title} - ${dish.price}</p>
        </div>
      </div>
    `;
    
    dishesDiv.appendChild(dishElement);
  });