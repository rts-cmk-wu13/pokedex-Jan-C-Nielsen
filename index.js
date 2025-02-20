let sectionElm = document.createElement("section")
sectionElm.class = "pokelist"

fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(function (response) {
        return response.json()
    }).then(
        function (data) {
            console.log(data.results);
            let divElm = document.createElement("div");
            divElm.class = "pokemons"
            divElm.innerHTML = data.results.map(function (pokemon) {

                let id = pokemon.url.slice(0, -1).split("/").pop()
                console.log(id);
                return `
               
             <article>
              <a href="detail.html?url=${pokemon.url}">
               <p><span>#${id}<span></p>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="">
  <h2>${pokemon.name}</h2>
    </a>
             </article>
           
        `

            }).join("")

            sectionElm.append(divElm)
        }
    )



document.querySelector("main").append(sectionElm)


// function createCard(pokemon) {
//     return `
//         <article>
//             <h2>${pokemon.name}</h2>
//         </article>
//     `
// } 