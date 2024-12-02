document.addEventListener("DOMContentLoaded", function() {
    alugas()
});




function alugas() {
    const livroId = localStorage.getItem('IdUltimoLivro'); // Pega o ID do livro do localStorage

    if (livroId) {
        // Faz a requisição para a API usando o ID
        fetch(`/api/livros?id=${livroId}`)
            .then(response => response.json())
            .then(livro => {
                // Exibe os dados do livro na página
                document.getElementById('titulo').textContent = livro.nome;
                document.getElementById('autor').textContent = livro.autor;
                document.getElementById('ano').textContent = livro.ano;
                document.getElementById('capa').src = livro.capa;
                document.getElementById('count').textContent = `${livro.quantidade} unidades disponíveis`;
            })
            .catch(error => {
                console.error('Erro ao carregar o livro:', error);
                alert('Não foi possível carregar os detalhes do livro.');
            });
    } else {
        alert('ID do livro não encontrado.');
    }
}

function redirecionarParaCheck() {
    history.pushState(null, '', '/aluguelcheck.html');
    location.reload()
}

async function alugar() {
    let id_livro = localStorage.getItem('IdUltimoLivro');
    let id_aluno = localStorage.getItem('UserId');
    if(id_aluno == null){
        redirecionarParaLogin()
    } else {
        const cal = new Date()
        let data_init = `${cal.getFullYear()}-${cal.getMonth() + 1}-${cal.getDate()}`

        const queryParams = new URLSearchParams({
            id_livro,
            id_aluno,
            data_init
        }).toString();

        try {
            const response = await fetch(`/api/locacoes?${queryParams}`, {
                method: "POST"
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro: ${errorData.value}`);
                return;
            }
            redirecionarParaCheck()
        } catch (error) {
            console.error(`Erro:, ${error}`);
            alert("Erro inesperado ao alugar o livro.");
        }
    }

}

function redirecionarParaLogin() {
    history.pushState(null, '', '/login.html');
    location.reload()
}