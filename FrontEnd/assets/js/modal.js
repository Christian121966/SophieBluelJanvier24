// Déclaration des variables globales
let isUserLoggedIn = localStorage.getItem("isLoggedIn") === "true";
let selectedImage = null;
let token = localStorage.getItem("token");

// Fonction pour mettre à jour le texte du bouton "Login"/"Logout" et la visibilité des éléments
function updateLoginButtonText() {
  const loginLink = document.getElementById("loginLink");
  const editionMode = document.querySelector(".edition-mode");
  const openModalIcon = document.querySelector("#openModalIcon");
  const modifierText = document.querySelector(".modifier");

  if (!loginLink || !editionMode || !openModalIcon || !modifierText) {
    console.error("One or more elements could not be found.");
    return;
  }

  if (isUserLoggedIn) {
    loginLink.textContent = "logout";
    editionMode.style.display = "flex";
    openModalIcon.style.display = "block";
    modifierText.style.display = "block";
    buttonContainer.style.display = "none";
  } else {
    loginLink.textContent = "login";
    editionMode.style.display = "none";
    openModalIcon.style.display = "none";
    modifierText.style.display = "none";
    buttonContainer.style.display = "block";
  }
}

// Fonction pour gérer la connexion de l'utilisateur
function login() {
  isUserLoggedIn = true;
  localStorage.setItem('isLoggedIn', 'true');
  updateLoginButtonText();
}

// Fonction pour gérer la déconnexion de l'utilisateur
function logout() {
  isUserLoggedIn = false;
  localStorage.removeItem('isLoggedIn');
  updateLoginButtonText();
}

// Fonction pour gérer le clic sur le lien de connexion/déconnexion
function handleLoginLinkClick(event) {
  event.preventDefault(); // Empêche le lien de naviguer vers une autre page

  if (isUserLoggedIn) {
    logout();
  } else {
    window.location.href = './login.html';
  }
}

// Ajoute le gestionnaire d'événements au lien de connexion/déconnexion
document.getElementById('loginLink').addEventListener('click', handleLoginLinkClick);

// Appel de la fonction updateLoginButtonText au chargement de la page
window.addEventListener('load', updateLoginButtonText);




//Création du modal pour "Ajouter une photo".

// Fonctions
function openModal() {
    modal.style.display = "block";
  }
  
  function closeModal() {
    modal.style.display = "none";
  }
  
  function deletePhoto(photoId) {
    fetch(`http://localhost:5678/api/works/${photoId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data:", data);
        photoElement.remove();
      })
      .catch((error) => {
        console.log(
          "Une erreur s'est produite lors de la suppression de la photo :",
          error
        );
      });
  }
  
  // Création du modal
  const modal = document.createElement('div');
  modal.id = 'modal-gallery';
  modal.classList.add('modal');
  modal.style.display = "none"; // Le modal est caché par défaut
  
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');
  
  const modalTitle = document.createElement('p');
  modalTitle.classList.add('modal-title');
  modalTitle.textContent = 'Galerie photo';
  
  const modalClose = document.createElement('div');
  modalClose.classList.add('modal-close');
  
  const closeIcon = document.createElement('i');
  closeIcon.classList.add('fa-solid', 'fa-xmark');
  
  const photoContainer = document.createElement('div');
  photoContainer.classList.add('modal-photo');
  
  const hrElement = document.createElement('hr');
  hrElement.classList.add('style-hr', 'trait');
  
  const addButton = document.createElement('input');
  addButton.type = 'submit';
  addButton.value = 'Ajouter une photo';
  addButton.classList.add('btnajout');
  addButton.dataset.modalId = 'modalAddPhoto';
  
  // Assemblage du modal
  modalClose.appendChild(closeIcon);
  modalContainer.append(modalTitle, modalClose, photoContainer, hrElement, addButton);
  modal.appendChild(modalContainer);
  document.body.appendChild(modal);
  
  // Ajout des écouteurs d'événements
  closeIcon.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  
  const editionMode = document.querySelector('.edition-mode');
  const openModalIcon = document.querySelector('#openModalIcon');
  const modifierText = document.querySelector('.modifier');
  
  editionMode.addEventListener('click', openModal);
  openModalIcon.addEventListener('click', openModal);
  modifierText.addEventListener('click', openModal);
  
  // Récupération des photos de l'API
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      console.log("Nombre de photos récupérées :", data.length);
      data.forEach((photo) => {
        const photoElement = document.createElement("div");
        photoElement.className = "modal-photo-item";
  
        const trashIcon = document.createElement("i");
        trashIcon.className = "fa-regular fa-trash-can";
        trashIcon.addEventListener("click", () => deletePhoto(photo.id));
  
        const imgElement = document.createElement("img");
        imgElement.src = photo.imageUrl;
  
        photoElement.append(trashIcon, imgElement);
        photoContainer.appendChild(photoElement);
      });
    })
    .catch((error) => {
      console.log(
        "Une erreur s'est produite lors de la récupération de photos depuis le backend :",
        error
      );
    });