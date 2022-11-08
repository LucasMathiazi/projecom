let email = getId('email');
let pass = getId('pass');

function authState() {
    let userEmail = localStorage.getItem('email');
    if (userEmail != "") {
        email.value = userEmail;
    }

    let userPass = localStorage.getItem('pass');
    if (userPass != "") {
        pass.value = userPass;
    }

    auth.onAuthStateChanged(logged => {
        if (logged) {
            getId('status').innerHTML = "status: autenticado com sucesso!";
            setTimeout(() => {
                window.location.replace("main.html")
            }, 2000);
        }
    });
}

getId('auth').addEventListener('click', () => {
    localStorage.setItem('email', email.value);
    localStorage.setItem('pass', pass.value);

    auth.signInWithEmailAndPassword(email.value, pass.value)
        .then(() => {
            getId('status').innerHTML = "status: autenticado com sucesso!";
            setTimeout(() => {
                window.location.replace("main.html")
            }, 1000);
        })
        .catch(error => { getId('status').innerHTML = error; });
});