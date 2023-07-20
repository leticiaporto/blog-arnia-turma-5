/* Variável que armazena o objeto DOM que representa o modal */
const modal = document.getElementById("modal")
/* Variável que armazena o objeto DOM que representa o input */
const pesquisa = document.getElementById("pesquisa")

/* 
    Função responsável por montar uma string com o HTML das notícias e depois adicioná-lo à página
*/
const renderizarNoticias = (noticias) => {
  const content = document.getElementById('content')
  let conteudo = ''

  noticias.forEach((noticia) => {
    conteudo = conteudo + `
      <div class="card">
        <div class="image">
          <img src="${noticia.imagem}" />
        </div>
        <div class="card-content">
          <div class="card-texts">
            <div class="card-title">
              ${noticia.titulo}
            </div>
            <div class="card-text">
              ${noticia.texto}
            </div>
          </div>
          <div class="card-footer">
            <div class="card-autor">${noticia.autor.apelido}</div>
            <div class="card-buttons">
              <button class="remove-button" onclick=excluirNoticia(${noticia.id})>Excluir</button>
              <button class="edit-button" onclick=editarNoticia(${noticia.id})>Editar</button>
            </div>
          </div>
        </div>
      </div>
    `
  })

  content.innerHTML = conteudo
}

/* 
    Função responsável por buscar as notícias na API
    O parâmetro "textoPesquisa" é opcional
*/
const getNoticias = async (textoPesquisa = null) => {
  let texto = ''

  /* 
    Acrescenta o parâmetro "q" somente de "textoPesquisa" for válido
  */
  if (textoPesquisa) {
    texto = `?q=${textoPesquisa}`
  }

  const apiResponse = await fetch(`http://localhost:3000/noticias${texto}`)
  const noticias = await apiResponse.json()
  renderizarNoticias(noticias)
}

/* 
    Função responsável por redirecionar para a página de cadastro
*/
const novaNoticia = () => {
  window.location = "html/noticia/cadastrar.html"
}

/* 
    Função responsável por redirecionar para a página de edição
*/
const editarNoticia = (id) => {
  window.location = `html/noticia/editar.html?id=${id}`
}

/* 
    Função responsável por excluir a notícia da API
*/
const excluirNoticia = async (id) => {
  await fetch(`http://localhost:3000/noticias/${id}`, {
    method: 'DELETE'
  })
  getNoticias()
}

/* 
    Adiciona evento que escuta o "soltar da tecla" ao campo de pesquisa
*/
pesquisa.addEventListener('keyup', (e) => {
  const texto = pesquisa.value

  /* 
    Se o campo de pesquisa estiver vazio, busca todas as notícias
    Se a tcla pressionada for "Enter", busca as notícias que contém o texto digitado
  */
  if (texto === '') {
    getNoticias()
  } else if (e.key === 'Enter') {
    getNoticias(texto)
  }
})


getNoticias()