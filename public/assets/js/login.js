async function login(event) {
    event.preventDefault();
    let email = document.getElementById("email").value
    let senha = document.getElementById("password").value

    if (email === "") {
        alert("Email obrigatorio.")
        return
    }
    if (senha.trim().length < 4) {
        alert("Senha obrigatoria.")
        return
    }

    const queryParams = new URLSearchParams({
        email,
        senha,
    }).toString();

    try {
        const response = await fetch(`/api/login?${queryParams}`, {
            method: "GET"
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Erro: ${errorData.value}`);
            return;
        }
        const data = await response.json();

        if (data.id) {
            localStorage.setItem("UserId", data.id);
        }
        redirecionarParaIndex()
    } catch (error) {
        console.error(`Erro:, ${error}`);
        alert("Erro inesperado ao realizar o login.");
    }
}

function redirecionarParaIndex() {
    history.pushState(null, '', '/index.html');
    location.reload()
}