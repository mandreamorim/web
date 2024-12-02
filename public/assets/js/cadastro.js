async function cadastrar(event) {
    event.preventDefault();
    let nome = document.getElementById('name').value
    let email = document.getElementById("email").value
    let matricula = document.getElementById("matricula").value
    let senha = document.getElementById("password").value
    let senhaRepeater = document.getElementById("confirm_password").value

    if (senha !== senhaRepeater) {
        alert("As senhas não são iguais. Por favor, tente novamente.")
        return
    }
    if (senha.trim().length < 4) {
        alert("Senha muito curta.")
        return
    }
    if (email === "") {
        alert("Email obrigatorio.")
        return
    }
    if (nome.trim().length < 4) {
        alert("Nome obrigatorio.")
        return
    }

    const queryParams = new URLSearchParams({
        nome,
        matricula,
        email,
        senha,
    }).toString();

    try {
        const response = await fetch(`/api/alunos?${queryParams}`, {
            method: "POST"
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Erro: ${errorData.value}`);
            return;
        }

        alert("Login criado com sucesso!");
        redirecionarParaLogin()
    } catch (error) {
        console.error(`Erro ao cadastrar aluno:, ${error}`);
        alert("Erro inesperado ao realizar o cadastro.");
    }
}

function redirecionarParaLogin() {
    history.pushState(null, '', '/index.html');
    location.reload()
}