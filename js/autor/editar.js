const formulario = document.getElementById('formulario')
let autorId = null // variável global para armazena o autor em 

/* 
    Função responsável por recuperar o ID da autor da URL a atribuir á variável "autorId" global
*/
const getIdUrl = () => {
    const paramsString = window.location.search
    const params = new URLSearchParams(paramsString)
    const id = params.get('id')

    return id
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
    Função responsável carregar os dados da autor em edição no formulário
*/
const carregarDadosFormulario = async (autor) => {
    document.getElementById('nome').value = autor.nome
    document.getElementById('apelido').value = autor.apelido
    document.getElementById('editora').value = autor.editora
    document.getElementById('foto').value = autor.foto
}

/* 
    Função responsável por editar o autor na API
*/
const editarAutor = async (id, autor) => {
    await fetch(`http://localhost:3000/autores/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(autor)
    })

    window.location = 'index.html'
}

/* 
    Função chamada ao abrir a página de edição para carregar os dados
*/
const carregarDados = async () => {
    // 1º: recuperar o id da URL
    autorId = getIdUrl()
    // 2º: buscar o autor selecionada
    const autor = await buscarAutor(autorId)
    // 3º: carregar os dados da autor do formulário
    carregarDadosFormulario(autor)
}

/*
    Evento adicionado ao formulário que espera a submissão do formulário
    Após a submissão, executa a função anônima 
*/
formulario.addEventListener('submit', async (e) => {
    e.preventDefault()

    //Recupera os dados dos campos do formulário 
    const nome = formulario.elements['nome'].value
    const apelido = formulario.elements['apelido'].value
    const editora = formulario.elements['editora'].value
    const foto = formulario.elements['foto'].value    

    //Monta o objeto de autor
    const autor = {
        nome,
        apelido,
        editora,
        foto,
    }

    //Chama a função para edição da autor
    editarAutor(autorId, autor)
})

carregarDados()