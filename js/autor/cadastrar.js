const formulario = document.getElementById('formulario')

/* 
    Função responsável por cadastrar o autor na API
*/
const cadastrarAutor = async (autor) => {
    await fetch('http://localhost:3000/autores', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(autor)
    })
    window.location = 'index.html'
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

    //Chama a função para cadastro da autor
    cadastrarAutor(autor)
})

carregarSelect()