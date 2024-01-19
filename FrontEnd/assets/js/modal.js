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



    //modalAddPhoto
    let modalAddPhoto
    let modalAddPhotoContainer;
    //Création de modalAddPhoto
    function createModalAddPhoto() {
      if ('!modalAddPhoto') {
      modalAddPhoto = document.createElement('div');
      modalAddPhoto.id = 'modalAddPhoto';
      modalAddPhoto.className = 'modal';
      modalAddPhoto.style.display = 'none';


      modalAddPhotoContainer = document.createElement('div');
      modalAddPhotoContainer.className = 'modal-container-add-photo';

      // Ajout de modalAddPhotoContainer à modalAddPhoto
      //modalAddPhoto.appendChild(modalAddPhotoContainer);

      // Création de l'icône de la flèche vers la gauche
      const arrowLeft = document.createElement('div');
      arrowLeft.className = 'arrow-left';

      const svgArrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgArrow.setAttribute('width', '21');
      svgArrow.setAttribute('height', '21');
      svgArrow.setAttribute('viewBox', '0 0 21 21');
      svgArrow.setAttribute('fill', 'none');

      const pathArrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathArrow.setAttribute('d', 'M0.439478 8.94458C-0.146493 9.53055 -0.146493 10.4822 0.439478 11.0681L7.9399 18.5686C8.52587 19.1545 9.47748 19.1545 10.0635 18.5686C10.6494 17.9826 10.6494 17.031 10.0635 16.445L5.11786 11.5041H19.4999C20.3297 11.5041 21 10.8338 21 10.004C21 9.17428 20.3297 8.50393 19.4999 8.50393H5.12255L10.0588 3.56303C10.6447 2.97706 10.6447 2.02545 10.0588 1.43948C9.47279 0.853507 8.52118 0.853507 7.93521 1.43948L0.43479 8.9399L0.439478 8.94458Z');
      pathArrow.setAttribute('fill', 'black');

      svgArrow.appendChild(pathArrow);
      arrowLeft.appendChild(svgArrow);

      // Ajout de l'icône de la flèche vers la gauche à la modal
      modalAddPhotoContainer.appendChild(arrowLeft);

      //Création de l'Icône de fermeture de modalAddPhoto
      const modalAddPhotoClose = document.createElement('div');
      modalAddPhotoClose.id = 'modalAddPhotoClose';
      modalAddPhotoClose.className = 'modalAddPhotoClose';

      const svgClose = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgClose.setAttribute('fill', 'none');
      svgClose.setAttribute('viewBox', '0 0 24 24');
      svgClose.setAttribute('stroke-width', '1.5');
      svgClose.setAttribute('stroke', 'currentColor');
      svgClose.setAttribute('class', 'w-6 h-6');

      const pathClose = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathClose.setAttribute('stroke-linecap', 'round');
      pathClose.setAttribute('stroke-linejoin', 'round');
      pathClose.setAttribute('d', 'M6 18L18 6M6 6l12 12');

      svgClose.appendChild(pathClose);
      modalAddPhotoClose.appendChild(svgClose);

      // Ajout de l'icône de fermeture à la modal
      modalAddPhotoContainer.appendChild(modalAddPhotoClose);


      //Création du titre "Ajout photo"
      const title = document.createElement('p');
      title.className = 'ajout_photo';
      title.textContent = 'Ajout Photo';

      modalAddPhotoContainer.appendChild(title);


      //Création de modalAddPhotoAjouterPhotoContainer
      let modalAddPhotoAjouterPhotoContainer = document.createElement('div');
      modalAddPhotoAjouterPhotoContainer.className = 'modalAddPhotoAjouterPhotoContainer';

      let modalAddPhotoAjouterPhoto = document.createElement('div');
      modalAddPhotoAjouterPhoto.className = 'modalAddPhotoAjouterPhoto';

      let label = document.createElement('label');
      label.setAttribute('for', 'fileInput');
      label.className = 'custom-file-upload';

      let h5 = document.createElement('h5');
      h5.textContent = '+ Ajouter photo';

      label.appendChild(h5);

      let input = document.createElement('input');
      input.type = 'file';
      input.id = 'fileInput';
      input.accept = 'image/*';

      let imageContainer = document.createElement('div');
      imageContainer.id = 'imageContainer';

      let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '76');
      svg.setAttribute('height', '76');
      svg.setAttribute('viewBox', '0 0 76 76');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

      let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.id = 'picture-svgrepo-com 1';

      let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.id = 'Vector';
      //path.setAttribute('d', 'M63.5517 15.8879C64.7228 15.8879 65.681 16.8461 65.681 18.0172V60.5768L65.0156 59.7118L46.9165 36.2894C46.3176 35.5042 45.3727 35.0517 44.3879 35.0517C43.4031 35.0517 42.4715 35.5042 41.8594 36.2894L30.8136 50.5824L26.7546 44.8998C26.1557 44.0614 25.1975 43.569 24.1595 43.569C23.1214 43.569 22.1632 44.0614 21.5644 44.9131L10.9178 59.8183L10.319 60.6434V60.6034V18.0172C10.319 16.8461 11.2772 15.8879 12.4483 15.8879H63.5517ZM12.4483 9.5C7.75048 9.5 3.93103 13.3195 3.93103 18.0172V60.6034C3.93103 65.3012 7.75048 69.1207 12.4483 69.1207H63.5517C68.2495 69.1207 72.069 65.3012 72.069 60.6034V18.0172C72.069 13.3195 68.2495 9.5 63.5517 9.5H12.4483ZM23.0948 35.0517C23.9337 35.0517 24.7644 34.8865 25.5394 34.5655C26.3144 34.2444 27.0186 33.7739 27.6118 33.1807C28.2049 32.5876 28.6755 31.8834 28.9965 31.1083C29.3175 30.3333 29.4828 29.5027 29.4828 28.6638C29.4828 27.8249 29.3175 26.9943 28.9965 26.2192C28.6755 25.4442 28.2049 24.74 27.6118 24.1468C27.0186 23.5537 26.3144 23.0831 25.5394 22.7621C24.7644 22.4411 23.9337 22.2759 23.0948 22.2759C22.2559 22.2759 21.4253 22.4411 20.6503 22759 21.4253 22.4411 20.6503 22.7621C19.8752 23.0831 19.171 23.5537 18.5779 24.1468C17.9847 24.74 17.5142 25.4442 17.1931 26.2192C16.8721 26.9943 16.7069 27.8249 16.7069 28.6638C16.7069 29.5027 16.8721 30.3333 17.1931 31.1083C17.5142 31.8834 17.9847 32.5876 18.5779 33.1807C19.171 33.7739 19.8752 34.2444 20.6503 34.5655C21.4253 34.8865 22.2559 35.0517 23.0948 35.0517Z');
      path.setAttribute('fill', '#B9C5CC');
      //<path d="M10 10 H 90 V 90 H 10 Z" />

      g.appendChild(path);
      svg.appendChild(g);

      modalAddPhotoAjouterPhoto.appendChild(label);
      modalAddPhotoAjouterPhoto.appendChild(input);
      modalAddPhotoAjouterPhoto.appendChild(imageContainer);
      modalAddPhotoAjouterPhoto.appendChild(svg);

      let ajouterPlus = document.createElement('div');
      ajouterPlus.className = 'ajouter-plus';

      let p = document.createElement('p');
      p.className = 'ajout';
      p.textContent = 'jpg.png : 4mo max';

      ajouterPlus.appendChild(p);

      modalAddPhotoAjouterPhotoContainer.appendChild(modalAddPhotoAjouterPhoto);
      modalAddPhotoAjouterPhotoContainer.appendChild(ajouterPlus);

      modalAddPhotoContainer.appendChild(modalAddPhotoAjouterPhotoContainer);



      // Création du formulaire
let form = document.createElement('form');
form.className = 'custom-form';

// Création du label "Titre"
let labelTitre = document.createElement('label');
labelTitre.className = 'titre-label';
labelTitre.htmlFor = 'Titre-photo';

// Création du paragraphe pour le texte "Titre"
let pTitre = document.createElement('p');
pTitre.className = 'titre-text';
pTitre.textContent = 'Titre';

// Ajout du paragraphe en tant qu'enfant du label
labelTitre.appendChild(pTitre);

// Création de l'input "Titre"
let inputTitre = document.createElement('input');
inputTitre.type = 'text';
inputTitre.id = 'Titre-photo';
inputTitre.name = 'Titre';
inputTitre.className = 'input-titre-photo';

// Ajout de l'input en tant qu'enfant du label
labelTitre.appendChild(inputTitre);

// Ajout du label au conteneur principal
modalAddPhotoContainer.appendChild(labelTitre);

// Création du label "Catégorie"
let labelCategorie = document.createElement('label');
labelCategorie.className = 'categorie-label';
labelCategorie.htmlFor = 'categorie-photo';

// Création du paragraphe pour le texte "Catégorie"
let pCategorie = document.createElement('p');
pCategorie.className = 'categorie-text';
pCategorie.textContent = 'Catégorie';

// Ajout du paragraphe en tant qu'enfant du label
labelCategorie.appendChild(pCategorie);

// Création du sélecteur "Catégorie"
let selectCategorie = document.createElement('select');
selectCategorie.id = 'categorie-photo';
selectCategorie.name = 'categorie';
selectCategorie.className = 'select-categorie';

// Ajout d'une option vide au début du sélecteur
let optionVide = document.createElement('option');
optionVide.value = "";
optionVide.textContent = "";
selectCategorie.appendChild(optionVide);

// Ajout des options au sélecteur
const categories = ['Objets', 'Appartements', 'Hôtels & Restaurants'];
categories.forEach(cat => {
  let option = document.createElement('option');
  option.value = cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '');
  option.textContent = cat;
  selectCategorie.appendChild(option);
});

// Ajout du sélecteur en tant qu'enfant du label
labelCategorie.appendChild(selectCategorie);

// Ajout du label "Catégorie" au conteneur principal
modalAddPhotoContainer.appendChild(labelCategorie);

// Ajout des labels au formulaire
form.append(labelTitre, labelCategorie);

// Ajout du formulaire à modalAddPhotoContainer
modalAddPhotoContainer.appendChild(form);



      //Création de "hr" la ligne de séparation
      let hr = document.createElement('hr');
      hr.className = 'styled-hr';
      modalAddPhotoContainer.appendChild(hr);


      //Création du bouton "Valider" de modalAddPhoto
      let button = document.createElement('button');
      button.type = 'submit';
      button.className = 'AddPhoto';

      let span = document.createElement('span');
      span.textContent = 'Valider';

      button.appendChild(span);
      modalAddPhotoContainer.appendChild(button);


       // Ajout de modalAddPhotoContainer à modalAddPhoto
      modalAddPhoto.appendChild(modalAddPhotoContainer);

      // Ajout de modalAddPhoto au document
      document.body.appendChild(modalAddPhoto);
    }
  }

      // Fonction pour ouvrir le modalAddPhoto et fermer le modal existant
function openModalAddPhoto() {
  // Fermeture du modal existant
  const modalGallery = document.getElementById('modal-gallery');
  if (modalGallery) {
    modalGallery.style.display = "none";
  }

  if (!modalAddPhoto) {
    createModalAddPhoto();
  }
  // Ouverture du modalAddPhoto
  modalAddPhoto.style.display = "block";
}

      // Ajout de l'écouteur d'événements au bouton
      addButton.addEventListener('click', openModalAddPhoto);



    // Ajout de l'écouteur d'événements au bouton après que le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', function() {
  createModalAddPhoto(); // Créez la modal au chargement de la page
  const addButton = document.querySelector('.btnajout');
  if (addButton) {
    addButton.addEventListener('click', openModalAddPhoto);
  } else {
    console.error('Le bouton "Ajouter une photo" n\'a pas été trouvé.');
  }
});



document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('fileInput');
  const modalAddPhoto = document.getElementById('modalAddPhoto');
  const modalGallery = document.getElementById('modal-gallery');
  const arrowLeft = document.querySelector('.arrow-left');
  const svgClose = document.querySelector('.svgClose'); // Assurez-vous que c'est le bon sélecteur
  const gallery = document.querySelector('.gallery');

  // Gestionnaire d'événements pour le téléchargement de l'image
  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const fileUrl = URL.createObjectURL(file);
      localStorage.setItem('uploadedImageUrl', fileUrl); // Stocker l'URL dans le localStorage

      // Créer un conteneur pour l'image avec le style désiré
      const photoItem = document.createElement('div');
      photoItem.className = 'modal-photo-item';

      // Créer un élément img et le configurer pour afficher l'image
      const img = document.createElement('img');
      img.src = fileUrl;
      img.style.width = '76px';
      img.style.height = '105px';
      img.style.objectFit = 'cover';
      photoItem.appendChild(img);

      // Ajouter le conteneur de l'image au conteneur principal
      const imageContainer = document.getElementById('imageContainer');
      imageContainer.innerHTML = '';
      imageContainer.appendChild(photoItem);

      // Rendre certains éléments invisibles après le téléchargement de l'image
      document.querySelector('label[for="fileInput"]').style.display = 'none';
      const svg = document.querySelector('.modalAddPhotoAjouterPhoto svg');
      if (svg) svg.style.display = 'none';
      const ajouterPlus = document.querySelector('.ajouter-plus');
      if (ajouterPlus) ajouterPlus.style.display = 'none';
    }
  });


      // Gestionnaire d'événements pour le bouton 'Valider'
const buttonValider = document.querySelector('.AddPhoto'); // Assurez-vous que c'est le bon sélecteur pour votre bouton
buttonValider.addEventListener('click', function() {
  const uploadedImageUrl = localStorage.getItem('uploadedImageUrl');
  const titre = document.getElementById('Titre-photo').value;
  const categorie = document.getElementById('categorie-photo').value;

  if (uploadedImageUrl && titre && categorie) {
    // Ajouter l'image à modal-gallery avec l'icône poubelle
    const photoItemGallery = document.createElement('div');
    photoItemGallery.className = 'modal-photo-item';

    const trashIcon = document.createElement('i');
    trashIcon.className = 'fa fa-trash';
    trashIcon.addEventListener('click', function() {
      // Supprimer l'élément de modal-gallery
      photoItemGallery.remove();
      // Supprimer les données de localStorage
      localStorage.removeItem('uploadedImageUrl');
      // Mettre à jour le compteur si nécessaire
      console.log("Nombre de photos récupérées :", localStorage.length);
    });
    photoItemGallery.appendChild(trashIcon);

    const imgGallery = document.createElement('img');
    imgGallery.src = uploadedImageUrl;
    imgGallery.style.width = '76px';
    imgGallery.style.height = '105px';
    photoItemGallery.appendChild(imgGallery);

    modalGallery.appendChild(photoItemGallery);

    // Ajouter l'image à la galerie sur la page d'accueil avec titre et catégorie
    const figure = document.createElement('figure');
    figure.dataset.category = categorie;

    const homeImage = document.createElement('img');
    homeImage.src = uploadedImageUrl;
    homeImage.alt = titre;
    homeImage.style.width = '361.67px';
    homeImage.style.height = '482.62px';

    const figcaption = document.createElement('figcaption');
    figcaption.textContent = titre;

    figure.appendChild(homeImage);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);

    // Réinitialiser l'aperçu de l'image et les champs du formulaire pour un nouvel ajout
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '';

    // Réafficher les éléments pour télécharger une nouvelle image
    const label = document.querySelector('label[for="fileInput"]');
    label.style.display = 'block';
    const svg = document.querySelector('.modalAddPhotoAjouterPhoto svg');
    if (svg) svg.style.display = 'block';
    const ajouterPlus = document.querySelector('.ajouter-plus');
    if (ajouterPlus) ajouterPlus.style.display = 'block';

    // Réinitialiser les valeurs du formulaire
    document.getElementById('Titre-photo').value = '';
    document.getElementById('categorie-photo').value = '';

    // Fermer modalAddPhoto et afficher modal-gallery
    modalAddPhoto.style.display = 'none';
    modalGallery.style.display = 'block';
  } else {
    console.error('Erreur : URL de l\'image, titre ou catégorie manquant.');
  }
});
});