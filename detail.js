
function StatDic(s) {
    //console.log("statdic:"+s);
    switch (s) {
        case "hp":
            return "HP";
            break;
        case "attack":
            return "ATK";
            break;
        case "defense":
            return "DEF";
            break;
        case "special-attack":
            return "SATK";
            break;
        case "special-defense":
            return "SDEF";
            break;
        case "speed":
            return "SPD";
            break;
    }
};

let search = window.location.search;
let params = new URLSearchParams(search);
//console.log(params);
let url = params.get("url");
//console.log(url);

let sectionElm = document.createElement("section")

function info(text1, text2) {
    return `<div class="infobox">
    <p>${text1}</p>
    <p>${text2}</p>
    </div>`;
}

function genHTML (data, flavor_text) {
    let innerHTML = "";
    console.log(data);
    let divElm = document.createElement("div");
    let id = url.slice(0, -1).split("/").pop();

    innerHTML = `
    <p>${data.name}</p>
     <p>${data.id}</p>

   <div> 
   <img loading="lazy" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="">
</div>
   `
    innerHTML += `<div class = "types">` + data.types.map(function (t) {
        return `
         <p class="type"> ${t.type.name}</p>
     `
    }).join("") + "</div>";

    innerHTML += `
    <h2>About</h2>
    <div>
    <div class="info">
  ${info(data.height, "height")}
  ${info(data.weight, "weight")}

<p>${data.moves[0].move.name}</p>
<p>${data.moves[1].move.name}</p>
</div>
</div>
<p>${flavor_text}</p>
`
    innerHTML += 
    "<h2>Basestat</h2>" +
    data.stats.map(function (s) {
        return `
        <div>
      
        <div class="stat">
<span> ${StatDic(s.stat.name)}</span>
<div class = "vertical-line"></div>
<span>${("00" + s.base_stat).slice(-3)}</span>
<meter value=${s.base_stat / 100}> </meter>
</div>
</div>
`
    }).join("")
    divElm.innerHTML = innerHTML;
    //console.log("innerHTML:" + innerHTML);
    sectionElm.append(divElm)
}

async function getPokemons(apiUrl) {
    let x = await fetch(apiUrl);
    let data = await x.json();
    let speciesUrl = data.species.url;
    console.log(speciesUrl);
    x = await fetch(speciesUrl);
    let speciesData = await x.json();
    console.log(speciesData);
    let flavor_text = speciesData.flavor_text_entries[0].flavor_text;
    console.log(flavor_text);
    genHTML(data, flavor_text);
  }


// fetch(url)
//     .then(function (response) {
//         return response.json()
//     }).then(data => genHTML(data));

getPokemons(url);

document.querySelector("main").append(sectionElm)

