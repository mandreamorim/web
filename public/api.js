let sugestoes = [
    "abacaxi", "cachorro", "computador", "floresta", "planeta", "tigre", "estrelas", "java", "telefone", "bicicleta",
    "mestre", "programador", "universo", "lua", "oceano", "pássaro", "código", "foguete", "música", "praia",
    "livro", "inovação", "galáxia", "conhecimento", "desafio", "futuro", "alegria", "energia", "amigo", "coragem",
    "aventura", "esporte", "história", "ciência", "paz", "tecnologia", "escritório", "desenho", "vencedor", "imagem",
    "sol", "chuva", "neve", "nuvem", "luz", "escuro", "carro", "ônibus", "avião", "caminhão",
    "pintura", "arte", "brisa", "relâmpago", "mestre", "sabedoria", "construção", "ferramenta", "rocha", "campo",
    "cidade", "planalto", "barco", "peixe", "sabão", "flor", "folha", "raiz", "água", "fogo",
    "roda", "relógio", "janela", "porta", "coração", "guitarra", "violão", "piano", "teclado", "microfone",
    "teatro", "cinema", "literatura", "fotografia", "vídeo", "programa", "linguagem", "mestre", "enigma", "puzzle",
    "sonho", "esperança", "inteligência", "lógica", "física", "química", "matemática", "genética", "biologia", "astronomia",
    "criação", "invenção", "imagine", "sucesso", "fama", "estrela", "modelo", "produtor", "diretor", "escritor",
    "cientista", "professor", "educação", "universidade", "livraria", "biblioteca", "futuro", "revolução", "escritura", "leitura"
]


let search = ""

function consumir(search){
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&projection=lite`)
        .then(response => response.json())
        .then(data => {
            livros = data.items.map(item => {
                const volumeInfo = item.volumeInfo;
                return {
                    nome: volumeInfo.title || "Título não disponível",
                    autor: volumeInfo.authors.join(", ") || ["Autor(es) desconhecido(s)"],
                    capa: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : "Capa não disponível",
                    ano: volumeInfo.publishedDate ? volumeInfo.publishedDate.split("-")[0] : "Data desconhecida"
                };
            });



            livros.forEach(livro => {
                // Definindo a URL da API
                const url = new URL("/api/livros");

                const params = {
                    capa: livro.capa,
                    nome: livro.nome,
                    ano: livro.ano,
                    autor: livro.autor,
                };

                // Adicionando os parâmetros à URL
                Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

                fetch(url, {
                    method: 'POST'
                })
                    .then(response => response.json())
                    .catch(error => {
                        console.error(error);
                    });
            });
        })
        .catch(error => console.error('Erro:', error))
}

sugestoes.forEach(value => {
    consumir(value);
})