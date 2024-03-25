//Get all the divs that have a type class
var types = document.querySelectorAll(".type");
var url = "https://pokeapi.co/api/v2/type/"
console.log(types);

//Get the weakness div container
const weaknessContainer = document.querySelector("#weaknesses")

//Add the getType function for each type dive when clicked o
types.forEach(type => type.addEventListener("click", function() {
    console.log(type.innerHTML);
    getType(type);
}));


/*
* Function that appends tye type name to the url to get the specified Pokemon type JSON and it's respective weakness, strength, etc
*/
async function getType(type) {
    //First clear the previous Type weakness
    clearWeakness();

    //Get the Pokemon type and append it to the PokeAPI URL and process and fetch the data from the JSON
    var typeUrl = url + type.innerHTML.toLowerCase();
    console.log(typeUrl);
    const response = await fetch(typeUrl);
    const typeData = await response.json();

    //Gets the list of weaknesses from the JSON
    const weaknesses = typeData.damage_relations.double_damage_from;

    //For each Pokemon type's weakness, add it to the weaknesses div container
    weaknesses.forEach(weakness => {
        let weaknessType = document.createElement("div");
        weaknessType.classList.add("weakness");

        console.log(weakness.name);
        weaknessType.innerText = weakness.name;

        weaknessContainer.appendChild(weaknessType);

    })
    //console.log(weaknesses);
}

function clearWeakness() {
    while(weaknessContainer.lastChild) {
        weaknessContainer.removeChild(weaknessContainer.lastChild);
    }
}