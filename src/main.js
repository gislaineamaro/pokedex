var next
var results = []
var previous
fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`)
  .then(response => response.json())
  .then(data => {
    next = data.next
    previous = data.previous
    results = data.results
    PercorreResultados()
  })

function PercorreResultados() {
  for (const resultados of results) {
    fetch(resultados.url)
      .then(response => {
        response.json().then(data => {
          const Name = data.name
          const id = data.id
          const img = data.sprites.other.dream_world.front_default
          const type = data.types[0].type.name

          console.log(Name, id, img, type)
          CriaElemento(Name, id, img, type)
        })
      })
      .catch(e => console.log('Erro' + e, message))
  }
}

// for (let index = 1; index < 20; index++) {

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
          class="img-fluid rounded-start img-pokemon-${type}"
          style="width: 30px;"
          alt=""
          />                            
          ${type}</button>
        </div>
      </div>
      <div class="col-md-4">
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
