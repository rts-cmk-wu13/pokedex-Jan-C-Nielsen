
let search = window.location.search;
let params = new URLSearchParams(search);
console.log(params);
let url = params.get("url");
console.log(url);

let sectionElm = document.createElement("section")


fetch(url)
    .then(function (response) {
        return response.json()
    }).then(
        function (data) {
            let innerHTML = "";
            console.log(data);
            let divElm = document.createElement("div");
            let id = url.slice(0, -1).split("/").pop()
            innerHTML = `
            <span>${data.name}</span>
             <span>${data.id}</span>

            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="">
`
innerHTML += data.types.map(function (t) {
              return  `
                 <span> ${t.type.name}</span>
             `
        }).join("")
        innerHTML += `
        <span>${data.weight}</span>
        <span>${data.height}</span>
        
`
        divElm.innerHTML = innerHTML;
        console.log("innerHTML:"+innerHTML);
            sectionElm.append(divElm)
        }
    )



document.querySelector("main").append(sectionElm)

