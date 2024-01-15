window.onload = function() {
    const loginForm = document.querySelector('#login-form');
    const errorMessage = document.querySelector('#message-error');
    const buttonConnect = document.querySelector('.button-connect');
    buttonConnect.addEventListener('click', async (e) => {
        console.log("Début de l'écouteur de clic");
        e.preventDefault();
        console.log('click');
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          email: loginForm.username.value,
          password: loginForm.password.value,
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:5678/api/users/login", requestOptions)
            .then(response => {
                if (response.status === 404 || response.status === 401) {
                    errorMessage.textContent = "email ou mot de passe invalide";
                    buttonConnect.classList.add("animationbtn");
                } else {
                    return response.json();
                }
            })
            .then(result => {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('token', result.token);
                window.location.href = "./index.html";
            })
        .catch(error => console.log('error', error));

    });

    
}
