const gallery = document.querySelector(".gallery");
let datas = [];
//const filterButtons = document.querySelector("#filter-buttons");

// Dans le script qui crée l'élément #filter-buttons
const filterButtons = document.createElement('div');
filterButtons.id = 'filter-buttons';
document.body.appendChild(filterButtons);
const event = new CustomEvent('filterButtonsCreated');
document.dispatchEvent(event);

// Dans votre script
document.addEventListener('filterButtonsCreated', updateData);

// Chargez les données initiales ici
function updateData() {
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(function (data) {
            datas = data;
            // Récupère la liste des catégories
            let categories = [];
            createFilter("Tous");
            data.forEach(work => {
                if (!categories.includes(work.category.name)) {
                    categories.push(work.category.name);
                    createFilter(work.category.name);
                }
            });
            updateGallery('Tous'); // Mettez à jour la galerie avec 'Tous' par défaut

            // Maintenant que les boutons ont été créés, ajoutez les écouteurs d'événements
            const buttons = document.querySelectorAll("#filter-buttons button");
            buttons.forEach(button => {
                button.addEventListener("click", () => {
                    const filterValue = button.getAttribute('data-filter');
                    updateGallery(filterValue); // Mettez à jour la galerie avec la catégorie du bouton cliqué
                });
            });
        });
}

// Crée les boutons
//function createFilter(categorie) {
    //let button = document.createElement("button");
    //button.setAttribute("data-filter", categorie);
    //button.classList.add("objects");
    //button.textContent = categorie;
    //filterButtons.appendChild(button);
//}

function updateGallery(activeCategory) {
    gallery.innerHTML = "";

    datas.forEach((work) => {
        if (activeCategory === "Tous" || work.category.name === activeCategory) {
            const figure = document.createElement("figure");
            figure.setAttribute("data-category", work.category.name);
            const img = document.createElement("img");
            img.src = work.imageUrl;
            img.alt = work.title;
            img.setAttribute("data-category", work.category.name);
            const figcaption = document.createElement("figcaption");
            figcaption.textContent = work.title;

            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        }
    });
}

// Appel de la fonction updateData après que le DOM a été chargé
window.addEventListener('DOMContentLoaded', updateData);


// Mettre les boutons sous modal1
const modal1 = document.querySelector(".modal1");

// Créez un conteneur <div> pour les boutons
const buttonContainer = document.createElement("div");
buttonContainer.id = "filter-buttons";

// Insérez le conteneur après la div modal1
modal1.parentNode.insertBefore(buttonContainer, modal1.nextSibling);

// Créez les boutons
function createFilter(categorie) {
    let button = document.createElement("button");
    button.setAttribute("data-filter", categorie);
    button.classList.add("objects");
    button.textContent = categorie;

    // Ajoutez les boutons au conteneur
    buttonContainer.appendChild(button);
}

//Suppression du second filterButton.
// Obtenez une référence à tous les éléments filter-buttons
const allFilterButtons = document.querySelectorAll("#filter-buttons");

// Supprimez le second élément
allFilterButtons[1].remove();
 