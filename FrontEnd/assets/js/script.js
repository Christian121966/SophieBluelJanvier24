const gallery = document.querySelector(".gallery");
let datas = [];
const buttonContainer = document.querySelector("#filter-buttons");

const filterButtons = document.createElement('div');
filterButtons.id = 'filter-buttons';
document.body.appendChild(filterButtons);

function updateData() {
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(function (data) {
            datas = data;
            let categories = [];
            createFilter("Tous");
            data.forEach(work => {
                if (!categories.includes(work.category.name)) {
                    categories.push(work.category.name);
                    createFilter(work.category.name);
                }
            });
            updateGallery('Tous');
            const buttons = document.querySelectorAll("#filter-buttons button");
            buttons.forEach(button => {
                button.addEventListener("click", () => {
                    buttons.forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");
                    const filterValue = button.getAttribute('data-filter');
                    updateGallery(filterValue);
                });
            });
        });
}
function updateGallery(activeCategory) {
    gallery.innerHTML = "";
    datas.forEach((work) => {
        if (activeCategory === "Tous" || work.category.name === activeCategory) {
            const figure = document.createElement("figure");
            figure.setAttribute("data-category", work.category.name);
            figure.dataset.imageGalleryId = work.id;
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
function createFilter(categorie) {
  let button = document.createElement("button");
  button.setAttribute("data-filter", categorie);
  button.classList.add("objects");
  button.textContent = categorie;
  if (categorie === "Tous") {
    button.classList.add("active");
  }
  buttonContainer.appendChild(button);
}

window.addEventListener('DOMContentLoaded', updateData);