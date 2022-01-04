var next
var results = []
var previous
var rangePage = 1
var isLoading = false

window.onload = () => {
  const btnPrevious = document.querySelector('[data-btnPrevious]')
  const btnNetx = document.querySelector('[data-btnNext]')
  const countPage = document.querySelector('[data-page]')
  countPage.innerHTML = rangePage

  btnNetx.addEventListener('click', async () => {
    const hasNextPage = next != null
    await CarregaPokemons(next)
    if (hasNextPage) {
      countPage.innerHTML = ++rangePage
    } else {
      countPage.innerHTML = rangePage
    }
  })

  btnPrevious.onclick = async () => {
    const hasPreviousPage = previous != null
    await CarregaPokemons(previous)
    if (hasPreviousPage) {
      countPage.innerHTML = --rangePage
    } else {
      countPage.innerHTML = rangePage
    }
  }
}

function setIsLoading(loading) {
  isloading = loading
  const loadingElement = document.querySelector('[data-loading]')
  const list = document.querySelector('[data-list]')

  if (isloading) {
    loadingElement.classList.remove('hidden')
    list.classList.add('hidden')
  } else {
    loadingElement.classList.add('hidden')
    list.classList.remove('hidden')
  }
}

CarregaPokemons('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0')
async function CarregaPokemons(url) {
  setIsLoading(true)
  await fetch(url)
    .then(response => response.json())
    .then(data => {
      next = data.next
      previous = data.previous
      results = data.results
      document.querySelector('[data-list]').innerHTML = ''

      PercorreResultados()
    })
}

async function PercorreResultados() {
  for (let resultados of results) {
    await fetch(resultados.url)
      .then(response => {
        response.json().then(data => {
          const Name = data.name
          const id = data.id
          const img =
            data.sprites.other.dream_world.front_default ||
            data.sprites.other['official-artwork'].front_default ||
            data.sprites.front_default
          const type = data.types[0].type.name

          CriaElemento(Name, id, img, type)
        })
      })
      .catch(e => console.log('Erro' + e, message))
  }
  setIsLoading(false)
}

function CriaElemento(name, id, img, type) {
  const list = document.querySelector('[data-list]')
  const card = document.createElement('div')
  card.classList.add('card', 'mb-3', 'cardGeneric')

  const cardContent = `
    <div class="row g-0 p-4">
      <div class="col-md-8 ">
        <div class="card-body">
          <h5 class="card-title" data-id-pokemon>#${id}</h5>
          <p class="card-text fs-5" data-name-pokemon>${name}</p>
          <button           
            type="button"
            class="btn p-2 mt-5 text-start disabled btn-type img-pokemon-${type}"
            data-type-pokemon
          >
          <img
          src="./assets/icons/${type}.svg"
          data-img-pokemon
          class="img-fluid rounded-start"
          style="width: 30px;"
          alt=""
          />                            
          ${type}</button>
        </div>
      </div>
      <div class="col-md-3">
        <img
          src="${img}"
          data-img-pokemon
          class="img-fluid rounded-start img-pokemon"
          alt=""
        />
      </div>
    </div>      
  `
  card.innerHTML = cardContent
  list.appendChild(card)
}
