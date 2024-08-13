const strategies = [
    {
        title: "Aléatoire",
        description: "Coopère ou trahit aléatoirement à chaque tour",
        nature: "méchant",
        forgiveness: "indulgent",
        function: randomStrategy,
    },
    {
        title: "Un prété pour deux rendu",
        description: "Commence par coopérer et trahit seulement si l'adversaire trahit deux fois de suite.",
        nature: "gentil",
        forgiveness: "indulgent",
        function: sampleStrategy,
    },
    {
        title: "Friedman",
        description: "Commence par coopérer et, si l'adversaire trahit, trahit à son tour puis pardonne et recommence à coopérer.",
        nature: "gentil",
        forgiveness: "indulgent",
        function: friedmanStrategy,
    },
    {
        title: "Joss",
        description: "Commence par coopérer puis copie ce qu'à fait l'adversaire au tour précédent; Trahit 10% du temps quoi qu'ait joué l'adversaire.",
        nature: "méchant",
        forgiveness: "rancunier",
        function: jossStrategy,
    },
    {
        title: "Un prété pour un rendu",
        description: "Commence par coopérer puis copie ce qu'à fait l'adversaire au tour précédent",
        nature: "gentil",
        forgiveness: "indulgent",
        function: titForTatStrategy,
    },

    {
        title: "Coopère toujours",
        description: "Coopère à chaque tour",
        nature: "gentil",
        forgiveness: "indulgent",
        function: alwaysCooperate,
    },
    {
        title: "Trahit toujours",
        description: "Trahit à chaque tour",
        nature: "méchant",
        forgiveness: "rancunier",
        function: alwaysDefect,
    },
    {
        title: "Grudger",
        description: "Coopère jusqu'à ce que l'adversaire trahisse, puis trahit pour toujours",
        nature: "gentil",
        forgiveness: "rancunier",
        function: grudgerStrategy,
    },
    {
        title: "Pavlov",
        description: "Coopère si les deux joueurs ont joué la même chose au tour précédent, trahit si ce n'est pas le cas",
        nature: "gentil",
        forgiveness: "indulgent",
        function: pavlovStrategy,
    },
];


const listGroup = document.getElementById('strategyList');
const player1Select = document.getElementById('player1select');
const player2Select = document.getElementById('player2select');
let startbtn = document.getElementById("startbtn");
let startMultipleMatchesbtn = document.getElementById("startMultipleMatchesbtn");
let tenxbtn = document.getElementById("tenxbtn");
let resultarea = document.getElementById("resultarea");
let resultarea2 = document.getElementById("resultarea2");

let delay = false
let numberofrounds = document.getElementById("numberofrounds");
let delaycheckbox = document.getElementById("delaycheckbox");


let p1scoreui = document.getElementById("p1score");
let p2scoreui = document.getElementById("p2score");
let p1Totalscoreui = document.getElementById("p1TotalScore");
let p2Totalscoreui = document.getElementById("p2TotalScore");



delaycheckbox.addEventListener("change", function () {
    // Update the global 'delay' variable based on the checkbox value
    delay = this.checked;

    // Log the current delay status (optional)
    console.log("Delay is now:", delay);
});

startbtn.addEventListener("click", match);
startMultipleMatchesbtn.addEventListener("click", multipleMatches);



// Function to populate the list group
function populateList() {

    strategies.forEach(strategy => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
        <h5>${strategy.title}</h5>
        <span class="capitalize-first badge text-bg-${strategy.nature === "gentil" ? "success" : "warning"}">${strategy.nature}</span>
        <span class="capitalize-first badge text-bg-${strategy.forgiveness === "indulgent" ? "success" : "warning"}">${strategy.forgiveness}</span>
        <p><strong>Description:</strong> ${strategy.description}</p>

      `;
        listGroup.appendChild(listItem);
    });
}

// Call the function to populate the list
populateList();

// Function to populate the select inputs
function populateSelectInputs() {


    strategies.forEach(strategy => {
        // Create option element
        const option = document.createElement('option');
        option.value = strategy.title;
        option.text = strategy.title;

        // Append option to both select inputs
        player1Select.appendChild(option.cloneNode(true));
        player2Select.appendChild(option);
    });
}

// Call the function to populate the select inputs
populateSelectInputs();



