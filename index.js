
currentoffset = 0;
let observedPokemon;

let options = {
    threshold: 1
}

let observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            currentoffset += 50;
            if (currentoffset < 1304) fetchpokemons(currentoffset);

        }
    })
}, options)

let sectionElm = document.createElement("section")
sectionElm.className = "pokelist"
let divElm = document.createElement("div");

function fetchpokemons(offset) {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`)
        .then(function (response) {
            return response.json()
        }).then(
            function (data) {
                console.log(data.results);

                divElm.className = "pokemons"
                divElm.innerHTML += data.results.map(function (pokemon) {

                    let id = pokemon.url.slice(0, -1).split("/").pop()
                    //console.log(id);
                    return `
               
             <article>
              <a href="detail.html?url=${pokemon.url}">
               <p><span>#${id}<span></p>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="">
  <h2>${pokemon.name}</h2>
    </a>
             </article>
           
        ` }).join("")

                observedPokemon = sectionElm.querySelector(".pokemons article:nth-last-child(5)");
                console.log("observedPokemon:" + observedPokemon);
                observer.observe(observedPokemon);

            }
        )



    document.querySelector("main").append(sectionElm);

    sectionElm.append(divElm)




}

fetchpokemons(currentoffset);

// function createCard(pokemon) {
//     return `
//         <article>
//             <h2>${pokemon.name}</h2>
//         </article>
//     `
// } 