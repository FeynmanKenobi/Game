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
let startbtn = document.getElementById("startbtn")
let resultarea = document.getElementById("resultarea")
let resultarea2 = document.getElementById("resultarea2")

let delay = false
let numberofrounds = document.getElementById("numberofrounds")
let delaycheckbox = document.getElementById("delaycheckbox")


let p1scoreui = document.getElementById("p1score")
let p2scoreui = document.getElementById("p2score")



delaycheckbox.addEventListener("change", function () {
    // Update the global 'delay' variable based on the checkbox value
    delay = this.checked;

    // Log the current delay status (optional)
    console.log("Delay is now:", delay);
});

startbtn.addEventListener("click", match)



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

function match() {
    console.log("Starting the match");

    // Disable start button
    startbtn.classList.add("disabled");

    // Initialize history array
    let history = [];

    // Get player 1 and 2 titles from select inputs
    const player1Title = document.getElementById("player1select").value;
    const player2Title = document.getElementById("player2select").value;

    let p1score = 0
    let p2score = 0

    // Get the strategy objects for player 1 and 2
    const player1Strategy = strategies.find(strategy => strategy.title === player1Title);
    const player2Strategy = strategies.find(strategy => strategy.title === player2Title);

    // Check if both players' strategies are found
    if (player1Strategy && player2Strategy) {
        // Function to play a single round with a 1-second delay
        const playRoundWithDelay = (round) => {
            // Base case: stop when reached 10 rounds
            if (round >= numberofrounds.value) {
                console.log("Match history:", history);
                return;
            }

            // Get moves for player 1 and 2 based on their strategies and the current history
            const player1Move = player1Strategy.function(player2Title, history);
            const player2Move = player2Strategy.function(player1Title, history);


            // calculate scores
            if (player1Move == "coopère" && player2Move == "coopère") {
                p1score += 3
                p2score += 3
            } else if (player1Move == "trahit" && player2Move == "trahit") {
                p1score += 1
                p2score += 1
            } else if (player1Move == "coopère" && player2Move == "trahit") {
                p1score += 0
                p2score += 5
            } else if (player1Move == "trahit" && player2Move == "coopère") {
                p1score += 5
                p2score += 0
            }


            // Record the moves in the history array
            history.push({
                [player1Title]: player1Move,
                [player2Title]: player2Move,
                "p1score": p1score,
                "p2score": p2score
            });

            // Log the moves for this round
            console.log(`Round ${round + 1}: ${player1Title} ${player1Move} vs ${player2Title} ${player2Move}`);

            // add it to the result area
            resultarea2.innerHTML += `
                <div class="ib mb-5" >
                        <div class="">
                     
                         ${round + 1 === 1 ? "Player 1: " : ""}  ${player1Move === "coopère" ? `<span class="badge rounded-pill text-bg-success">C</span>` : `<span class="badge rounded-pill text-bg-warning">D</span>`}
                        <br>
                        ${round + 1 === 1 ? "Player 2: " : ""} ${player2Move === "coopère" ? `<span class="badge rounded-pill text-bg-success">C</span>` : `<span class="badge rounded-pill text-bg-warning">D</span>`}
                </div>`


            // update score on ui

            p1scoreui.innerText = p1score
            p2scoreui.innerText = p2score



            // resultarea.innerHTML += `
            //     <div class="col mb-2">
            //         <div class="card">
            //             <div class="card-body">
            //             Round ${round + 1}:
            //             <br>
            //             P1 ${player1Move === "coopère" ? "C" : "D"}
            //             <br>
            //             P2 ${player2Move === "coopère" ? "C" : "D"}
            //             </div>
            //         </div>
            //     </div>`



            // Call the function recursively with a delay
            if (delay) {
                setTimeout(() => playRoundWithDelay(round + 1), 1000);
            } else {
                playRoundWithDelay(round + 1);
            }
        };

        // Start playing rounds
        playRoundWithDelay(0);
    } else {
        console.error("One or both player strategies not found");
    }

    // Return the history array
    return history;
}



