
    // URL da API que retorna os livros
    const apiUrl = `/api/livros`;

    // Elemento onde os livros serão adicionados
    const listaDeLivros = document.getElementById('livrosContainer');

    // Função para buscar livros e renderizar no menu
    async function carregarLivros() {
        try {
            // Fazer requisição à API
            const response = await fetch(apiUrl);
            const livros = await response.json();

            // Limpar container antes de adicionar os livros
            listaDeLivros.innerHTML = '';

            // Adicionar os livros ao container
            livros.forEach((livro, index) => {
                // Criar o card para o livro
                const card = document.createElement('div');
                card.className = 'col-md-4 mb-4'; // Define 3 itens por linha no Bootstrap
                card.innerHTML = `
          <div class="card h-100" data-id="${livro.id}">
            <img src="${livro.capa}" class="card-img-top" alt="${livro.nome}">
            <div class="card-body">
              <h5 class="card-title">${livro.nome}</h5>
              <p class="card-text">Autor: ${livro.autor}</p>
              <button class="btn btn-primary" onclick="salvarIdERedirecionar(this)">Alugar</button>
            </div>
          </div>
        `;

                // Adicionar o card ao container
                listaDeLivros.appendChild(card);
            });
        } catch (error) {
            console.error('Erro ao carregar livros:', error);
        }
    }

    function salvarIdERedirecionar(button) {
        // Pega o card pai (que contém o atributo 'data-id')
        const card = button.closest('.card');
        const livroId = card.getAttribute('data-id');  // Pega o ID armazenado no atributo data-id

        // Salva o ID no localStorage
        localStorage.setItem('IdUltimoLivro', livroId);

        // Redireciona o usuário para outra página (por exemplo, /detalhes)
        window.location.href = '/aluguel.html';  // Redireciona para a página de detalhes
    }

    // Chamar a função quando a página carregar
    document.addEventListener('DOMContentLoaded', carregarLivros);
