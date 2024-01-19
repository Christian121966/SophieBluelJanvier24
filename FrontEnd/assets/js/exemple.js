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
photoItemGallery.appendChild(trashIcon);

const imgGallery = document.createElement('img');
imgGallery.src = uploadedImageUrl;
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

// Après l'envoi de l'image
const label = document.querySelector('label[for="fileInput"]');
label.style.display = 'block'; // ou 'flex' si vous utilisez Flexbox pour centrer

// Réinitialiser l'aperçu de l'image et les champs du formulaire pour un nouvel ajout
const imageContainer = document.getElementById('imageContainer');
imageContainer.innerHTML = '';

// Réafficher les éléments pour télécharger une nouvelle image
document.querySelector('label[for="fileInput"]').style.display = 'block';
const svg = document.querySelector('.modalAddPhotoAjouterPhoto svg');
if (svg) svg.style.display = 'block';
const ajouterPlus = document.querySelector('.ajouter-plus');
if (ajouterPlus) ajouterPlus.style.display = 'block';

// Réinitialiser les valeurs du formulaire
document.getElementById('Titre-photo').value = '';
document.getElementById('categorie-photo').value = '';

// Fermer modalAddPhoto et afficher modal-gallery
modalGallery.style.display = 'block';
} else {
console.error('Erreur : URL de l\'image, titre ou catégorie manquant.');
}
});

// Ajout de l'écouteur d'événements 'click' à modalAddPhotoClose
const modalAddPhotoClose = document.getElementById('modalAddPhotoClose');
modalAddPhotoClose.addEventListener('click', function() {
// Sélectionnez modalAddPhoto en utilisant son ID et changez son style pour le cacher
const modalAddPhoto = document.getElementById('modalAddPhoto');
if (modalAddPhoto) {
modalAddPhoto.style.display = 'none';
}
});
