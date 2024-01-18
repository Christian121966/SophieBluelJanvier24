// Création du formulaire
let form = document.createElement('form');
form.className = 'custom-form';

// Création du label "Titre"
let labelTitre = document.createElement('label');
labelTitre.className = 'titre';

let h5 = document.createElement('h5');
h5.textContent = 'Titre';

let inputTitre = document.createElement('input');
inputTitre.type = 'text';
inputTitre.id = 'Titre-photo';
inputTitre.name = 'Titre';
inputTitre.className = 'input-titre-photo';

labelTitre.append(h5, inputTitre);

// Création du label "Catégorie"
let labelCategorie = document.createElement('label');
labelCategorie.className = 'categorie';

let h6 = document.createElement('h6');
h6.textContent = 'Catégorie';

let div = document.createElement('div');
div.className = 'dropdown';

let select = document.createElement('select');
select.name = 'categorie';
select.id = 'categorie-photo';
select.className = 'select-categorie';

let option1 = document.createElement('option');
option1.value = '#';

let option2 = document.createElement('option');
option2.value = 'option1';
option2.textContent = 'Objets';

let option3 = document.createElement('option');
option3.value = 'option2';
option3.textContent = 'Appartements';

let option4 = document.createElement('option');
option4.value = 'option2';
option4.textContent = 'Hôtels & restaurants';

select.append(option1, option2, option3, option4);
div.appendChild(select);

labelCategorie.append(h6, div);

// Ajout des labels au formulaire
form.append(labelTitre, labelCategorie);

// Ajout du formulaire à modalAddPhotoContainer
modalAddPhotoContainer.appendChild(form);