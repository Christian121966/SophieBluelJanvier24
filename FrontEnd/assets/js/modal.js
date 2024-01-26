let selectedImage = null;


const token = localStorage.getItem("token");
if (token) {
  let submitFormVerify = false;
  document.getElementById("loginLink").textContent = "logout";
  document.getElementById("loginLink").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "./login.html";
  });

  document.querySelector("#openModalIcon").classList.remove("hidden");
  document.querySelectorAll(".btn-modifier").forEach((item) => {
    item.classList.remove("hidden");
  });
  document.querySelector("#filter-buttons").classList.add("hidden");

  document.querySelectorAll(".btn-modifier").forEach((item) => {  
    item.addEventListener("click", openModal);
  });

  document.querySelectorAll(".modal-close").forEach((item) => {
    item.addEventListener("click", () => { 
      closeModal();
      closeModalPhoto();
    });
  });
  document.querySelector(".arrow-left").addEventListener("click", () => {
    openModal();
    closeModalPhoto();
  });

  document.querySelectorAll(".modal").forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        closeModal();
        closeModalPhoto();
      }
    });
  });

  document.querySelector(".btnajout").addEventListener("click", () => {
    openModalPhoto();
    closeModal();
  });

  document.querySelector(".AddPhoto").addEventListener("click", (e) => {
    e.preventDefault();
    submitForm();
  });

  document
    .getElementById("fileInput")
    .addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const fileUrl = URL.createObjectURL(file);
        const photoItem = document.createElement("div");
        photoItem.className = "modal-photo-item";
        const img = document.createElement("img");
        img.src = fileUrl;
        photoItem.appendChild(img);

        const imageContainer = document.getElementById("imageContainer");
        imageContainer.innerHTML = "";
        imageContainer.appendChild(photoItem);
        document
          .querySelector(".modalAddPhotoAjouterPhotoContainer")
          .classList.add("hidden");
      }
    });
  
  document.getElementById("Titre-photo").addEventListener("change", verifyForm);
  document
    .getElementById("categorie-photo")
    .addEventListener("change", verifyForm);
  document.getElementById("fileInput").addEventListener("change", verifyForm);
  
  fetch("http://localhost:5678/api/categories")
      .then((response) => response.json())
    .then((data) => {
        data.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.id;
          option.textContent = category.name;
          document.getElementById("categorie-photo").appendChild(option);
        });
      });

  function openModal() {
    document.querySelector(".modal-photo").innerHTML = ""; 
    datas.forEach((work) => {
      const photoElement = document.createElement("div");
      photoElement.className = "modal-photo-item";
      photoElement.dataset.photoId = work.id;

      const trashIcon = document.createElement("i");
      trashIcon.className = "fa-regular fa-trash-can";
      trashIcon.addEventListener("click", () => deletePhoto(work.id));

      const imgElement = document.createElement("img");
      imgElement.src = work.imageUrl;

      photoElement.append(trashIcon, imgElement);
      document.querySelector(".modal-photo").appendChild(photoElement);
    });
    document.querySelector("#modal-gallery").classList.remove("hidden");
  }
  function openModalPhoto() {
    document
      .querySelector("#modalAddPhoto")
      .classList.remove("hidden");
  }

    function closeModal() {
      document.querySelector("#modal-gallery").classList.add("hidden");
    }
    function closeModalPhoto() {
      document.querySelector("#modalAddPhoto").classList.add("hidden");
      document.getElementById("imageContainer").innerHTML = "";
      document
        .querySelector(".modalAddPhotoAjouterPhotoContainer")
        .classList.remove("hidden");
      document.getElementById("fileInput").file = [];
    }

  function deletePhoto(photoId) {
    fetch(`http://localhost:5678/api/works/${photoId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 204) {
          document
            .querySelector(`.modal-photo-item[data-photo-id="${photoId}"]`)
            .remove();
          document
            .querySelector(`figure[data-image-gallery-id="${photoId}"]`)
            .remove();
        }
      })
      .catch((error) => {
        console.log(
          "Une erreur s'est produite lors de la suppression de la photo :",
          error
        );
      });
  }

  function verifyForm() {
    if(
      document.getElementById("Titre-photo").value !== "" &&
      document.getElementById("categorie-photo").value !== "" &&
      document.getElementById("fileInput").files.length > 0
    ) {
      document.querySelector(".AddPhoto").disabled = false;
      document.querySelector(".AddPhoto").classList.add('active');
      submitFormVerify = true;
    }else {
      document.querySelector(".AddPhoto").disabled = true;
      document.querySelector(".AddPhoto").classList.remove("active");
      submitFormVerify = false;
    }
  }

  function submitForm() {
    if (!submitFormVerify) return;
    const formDataImage = new FormData();
    formDataImage.append("title", document.getElementById("Titre-photo").value);
    formDataImage.append("category", document.getElementById("categorie-photo").value);
    formDataImage.append(
      "image",
      document.getElementById("fileInput").files[0]
    );
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataImage,
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          console.error("Erreur : impossible d'ajouter la photo.");
        }
      })
      .then((data) => {
        datas.push(data);
        data.category = [];
        updateGallery("Tous");
        closeModalPhoto();
        openModal();


      document.getElementById("Titre-photo").value = "";
      document.getElementById("categorie-photo").value = "";
      document.getElementById("fileInput").value = "";

      document.querySelector(".AddPhoto").disabled = true;
      document.querySelector(".AddPhoto").classList.remove("active");
      submitFormVerify = false;
      });
  }
}