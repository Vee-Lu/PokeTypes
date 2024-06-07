export {};

interface Type {
  name: string;
  color: string;
}

//Get all the elements needed for PokeType
var types:NodeListOf<HTMLElement> = document.querySelectorAll(".type")!;
var url:String = "https://pokeapi.co/api/v2/type/";
var effective:HTMLElement = document.querySelector("#effective")!;
var not_effective:HTMLElement = document.querySelector("#not_effective")!;
const clear:HTMLElement = document.querySelector("#clear")!;

var listOfTypes:Array<Type> = [];
types.forEach((type) => {

});

//Clears the selected status on screen
clear.addEventListener("click", clearTypes);

//Add the getType function for each element type
types.forEach((type) => type.addEventListener("click", function () {
    //Pass in the String to getType and add the selected status to the type
    getType(type.childNodes[3]);
    type.classList.add("selected");
  }),
);

/*
 * Function that appends the type String to the url to get the specified Pokemon type JSON and it's respective weakness, strength, etc
 */
async function getType(type:Node|Element) {
  //First clear the previous Type weakness
  clearTypes();

  //Get the Pokemon type in String form and append it to the PokeAPI URL so we can process and fetch the data from the PokeAPI JSON
  var typeUrl = url + type.innerHTML.toLowerCase();

  //Fetch the data and get the json from PokeAPI
  const response = await fetch(typeUrl);
  const typeData = await response.json();

  //Gets the list of weaknesses from the JSON
  const strengths = typeData.damage_relations.double_damage_to;
  const weaknesses = typeData.damage_relations.half_damage_to;

  //For each Pokemon type's weakness, add it to the Weakness Table
  weaknesses.forEach((weakness) => {
    let weakRow = document.createElement("tr");
    let weakHeader = document.createElement("th");

    let typeWeakness:Element = document.getElementById(weakness.name)!.children[1];
    let typeCSS = window.getComputedStyle(typeWeakness);
    let color = typeCSS.getPropertyValue("background-color");

    weakRow.appendChild(weakHeader);
    weakHeader.style.backgroundColor = color;

    weakHeader.innerText = weakness.name;
    weakHeader.innerText =
      weakHeader.innerText[0].toUpperCase() + weakHeader.innerText.slice(1);

    not_effective.appendChild(weakRow);
  });

  //For each Pokemon type's strengths, add it to the Strength Table
  strengths.forEach((strength) => {
    let strengthRow = document.createElement("tr");
    let strengthHeader = document.createElement("th");

    let typeStrength:Element = document.getElementById(strength.name)!.children[1];
    let typeCSS = window.getComputedStyle(typeStrength);
    let color = typeCSS.getPropertyValue("background-color");

    strengthRow.appendChild(strengthHeader);
    strengthHeader.style.backgroundColor = color;

    strengthHeader.innerText = strength.name;
    strengthHeader.innerText =
      strengthHeader.innerText[0].toUpperCase() +
      strengthHeader.innerText.slice(1);

    effective.appendChild(strengthRow);
  });
}

/*
 *Resets and clears the selected type's weaknesses and strengths from the table headers and rows
 */
function clearTypes() {
  var prev = document.getElementsByClassName("selected");

  if (prev[0] != undefined) {
    prev[0].classList.remove("selected");
  }

  while (not_effective.childNodes.length > 2) {
    not_effective.removeChild(not_effective.lastChild!);
  }

  while (effective.childNodes.length > 2) {
    effective.removeChild(effective.lastChild!);
  }
}
