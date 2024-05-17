//Get all the elements needed for PokeType
var types = document.querySelectorAll(".type");
var url = "https://pokeapi.co/api/v2/type/"
var effective = document.querySelector("#effective");
var not_effective = document.querySelector("#not_effective");


//


//Add the getType function for each type class
types.forEach(type => type.addEventListener("click", function() {
    //console.log(type.childNodes[3].innerHTML);
    getType(type.childNodes[3]);
}));


/*
* Function that appends tye type name to the url to get the specified Pokemon type JSON and it's respective weakness, strength, etc
*/
async function getType(type) {
    //First clear the previous Type weakness
    clearTypes();

    //Get the Pokemon type and append it to the PokeAPI URL so we can process and fetch the data from the PokeAPI JSON
    var typeUrl = url + type.innerHTML.toLowerCase();
    //console.log(typeUrl);
    const response = await fetch(typeUrl);
    const typeData = await response.json();

    //Gets the list of weaknesses from the JSON
    const strengths = typeData.damage_relations.double_damage_to;
    const weaknesses = typeData.damage_relations.half_damage_to;

    //For each Pokemon type's weakness, add it to the Weakness Table
    weaknesses.forEach(weakness => {
        let weakRow = document.createElement("tr");
        let weakHeader = document.createElement("th");


        let type = document.getElementById(weakness.name).children[1];
        let typeCSS = window.getComputedStyle(type);
        let color = typeCSS.getPropertyValue("background-color");
        

       
        weakRow.appendChild(weakHeader);
        weakHeader.style.backgroundColor = color;

        weakHeader.innerText = weakness.name;
        weakHeader.innerText = weakHeader.innerText[0].toUpperCase() + weakHeader.innerText.slice(1);;

        not_effective.appendChild(weakRow);
    })

     //For each Pokemon type's strengths, add it to the Strength Table
     strengths.forEach(strength => {
        let strengthRow = document.createElement("tr");
        let strengthHeader = document.createElement("th");

        let type = document.getElementById(strength.name).children[1];
        let typeCSS = window.getComputedStyle(type);
        let color = typeCSS.getPropertyValue("background-color");
       
        strengthRow.appendChild(strengthHeader);
        strengthHeader.style.backgroundColor = color;

        strengthHeader.innerText = strength.name;
        strengthHeader.innerText = strengthHeader.innerText[0].toUpperCase() + strengthHeader.innerText.slice(1);;

        effective.appendChild(strengthRow);
    })

}

function clearTypes() {
    while(not_effective.childNodes.length > 2) {
        not_effective.removeChild(not_effective.lastChild);
    }

    while(effective.childNodes.length > 2) {
        effective.removeChild(effective.lastChild);
    }
}
