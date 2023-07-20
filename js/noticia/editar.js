const formulario = document.getElementById('formulario')
let noticiaId = null // variável global para armazena a notícia em 

/* 
    Função responsável por recuperar o ID da notícia da URL a atribuir á variável "noticiaId" global
*/
const getIdUrl = () => {
    const paramsString = window.location.search
    const params = new URLSearchParams(paramsString)
    const id = params.get('id')

    return id
}

/* 
    Função responsável por buscar o notícia na API
*/
const buscarNoticia = async (id) => {
    const response = await fetch(`http://localhost:3000/noticias/${id}`)
    const noticia = await response.json()
    return noticia
}

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
    Função responsável carregar os dados da notícia em edição no formulário
*/
const carregarDadosFormulario = async (noticia) => {
    document.getElementById('titulo').value = noticia.titulo
    document.getElementById('autor').value = noticia.autor.id
    document.getElementById('imagem').value = noticia.imagem
    document.getElementById('texto').value = noticia.texto
}

/* 
    Função responsável por editar a notícia na API
*/
const editarNoticia = async (id, noticia) => {
    await fetch(`http://localhost:3000/noticias/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(noticia)
    })

    window.location = '../../index.html'
}

/* 
    Função chamada ao abrir a página de edição para carregar os dados
*/
const carregarDados = async () => {
    // 1º: recuperar o id da URL
    noticiaId = getIdUrl()
    // 2º: buscar a notícia selecionada
    const noticia = await buscarNoticia(noticiaId)
    // 3º: povoar o select de autores
    await carregarSelect()
    // 4º: carregar os dados da notícia do formulário
    carregarDadosFormulario(noticia)
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

    //Chama a função para edição da notícia
    editarNoticia(noticiaId, noticia)
})

carregarDados()