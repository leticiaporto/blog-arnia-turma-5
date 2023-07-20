const formulario = document.getElementById('formulario')

/* 
    Função responsável por buscar o autor na API
*/
const buscarAutor = async (id) => {
    const resposta = await fetch(`http://localhost:3000/autores/${id}`)
    const autor = await resposta.json()
    return autor
}

/* 
    Função responsável por buscar os autores na API
*/
const buscarAutores = async () => {
    const resposta = await fetch('http://localhost:3000/autores')
    const autores = await resposta.json()
    return autores
}

/* 
    Função responsável por "povoar" o select de autores com a lista recuerada da API
*/
const carregarSelect = async () => {
    const autores = await buscarAutores()
    const autorSelect = document.getElementById('autor')

    const opcaoVazia = new Option('Selecione um autor...')
    autorSelect.options.add(opcaoVazia)

    autores.forEach(autor => {
        const opcao = new Option(autor.apelido, autor.id)
        autorSelect.options.add(opcao)
    })
}

/* 
    Função responsável por cadastrar a notícia na API
*/
const cadastrarNoticia = async (noticia) => {
    await fetch('http://localhost:3000/noticias', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(noticia)
    })
    window.location = '../../index.html'
}

/*
    Evento adicionado ao formulário que espera a submissão do formulário
    Após a submissão, executa a função anônima 
*/
formulario.addEventListener('submit', async (e) => {
    e.preventDefault()

    //Recupera os dados dos campos do formulário 
    const titulo = formulario.elements['titulo'].value
    const autor = formulario.elements['autor'].value
    const imagem = formulario.elements['imagem'].value
    const texto = formulario.elements['texto'].value    

    //Buscar o autor selecionado
    const autorObjeto = await buscarAutor(autor)

    //Monta o objeto de notícia
    const noticia = {
        titulo,
        autor: {
            id: autorObjeto.id,
            apelido: autorObjeto.apelido
        },
        imagem,
        texto,
    }

    //Chama a função para cadastro da notícia
    cadastrarNoticia(noticia)
})

carregarSelect()