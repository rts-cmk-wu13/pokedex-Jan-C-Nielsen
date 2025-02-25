
let search = window.location.search;
let params = new URLSearchParams(search);
console.log(params);
let url = params.get("url");
console.log(url);

let sectionElm = document.createElement("section")

function info(text1, text2)
{
   return  `<div class="infobox">
    <p>${text1}</p>
    <p>${text2}</p>
    </div>`;
}

fetch(url)
    .then(function (response) {
        return response.json()
    }).then(
        function (data) {
            let innerHTML = "";
            console.log(info(data.height, "height"));
            let divElm = document.createElement("div");
            let id = url.slice(0, -1).split("/").pop();

            innerHTML = `
            <p>${data.name}</p>
             <p>${data.id}</p>

           <div> 
           <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="">
</div>
           `
            innerHTML += `<div class = "types">` + data.types.map(function (t) {
                return `
                 <p> ${t.type.name}</p>
             `
            }).join("") + "</div>";

            innerHTML += `
            <div class="info">
          ${info(data.height, "height")}
          ${info(data.weight, "weight")}
        
        <p>${data.moves[0].move.name}</p>
        <p>${data.moves[1].move.name}</p>
        </div>

`
            innerHTML += data.stats.map(function (s) {
                return `
       <p> ${s.stat.name}</p>
       <p> ${s.base_stat}</p>
   `
            }).join("")
            divElm.innerHTML = innerHTML;
            console.log("innerHTML:" + innerHTML);
            sectionElm.append(divElm)
        }
    )



document.querySelector("main").append(sectionElm)

