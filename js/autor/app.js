/* Variável que armazena o objeto DOM que representa o modal */
const modal = document.getElementById("modal")

/* 
    Função responsável por montar uma string com o HTML dos autores e depois adicioná-lo à página
*/
const renderizarAutores = (autores) => {
    const content = document.getElementById('content-autor')
    let conteudo = ''

    autores.forEach((autor) => {
        conteudo = conteudo + `
      <div class="card-list-autor">
        <div class="card-autor-nome">
          ${autor.nome}
        </div>
        <div class="card-autor-acoes">
            <div class="card-autor-button" onclick=editarAutor(${autor.id})>
              <img src="../../images/edit.svg" />
            </div>
            <div class="card-autor-button" onclick=excluirAutor(${autor.id})>
              <img src="../../images/delete.svg" />
            </div>
        </div>
      </div>
    `
    })

    content.innerHTML = conteudo
}

/* 
    Função responsável por buscar os autores na API
*/
const getAutores = async () => {
    const apiResponse = await fetch('http://localhost:3000/autores')
    const autores = await apiResponse.json()
    renderizarAutores(autores)
}

/* 
    Função responsável por redirecionar para a página de cadastro
*/
const novoAutor = () => {
  window.location = "cadastrar.html"
}

/* 
    Função responsável por redirecionar para a página de edição
*/
const editarAutor = (id) => {
  window.location = `editar.html?id=${id}`
}

/* 
    Função responsável por excluir a notícia da API
*/
const excluirAutor = async (id) => {
  await fetch(`http://localhost:3000/autores/${id}`, {
      method: 'DELETE'
  })
  getAutores()
}


getAutores()