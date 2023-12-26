const strategies = [
    {
        title: "Random",
        description: "Randomly cooperates or defects in each round",
        nature: "nasty",
        forgiveness: "forgiving",
        function: randomStrategy,
    },
    {
        title: "Sample (Tit for Two Tats)",
        description: "Starts by cooperating and defects only after the opponent has defected twice in a row",
        nature: "nice",
        forgiveness: "forgiving",
        function: sampleStrategy,
    },
    {
        title: "Friedman",
        description: "Begins by cooperating, but if the opponent defects once, it forgives and returns to cooperation immediately.",
        nature: "nice",
        forgiveness: "forgiving",
        function: friedmanStrategy,
    },
    {
        title: "Joss",
        description: "Starts by cooperating and then starts copying what the other player did on the last move; 10% of the time defects regardless",
        nature: "nasty",
        forgiveness: "unforgiving",
        function: jossStrategy,
    },
    {
        title: "Tit For Tat",
        description: "Starts by cooperating and then copies what the opponent did in the last move",
        nature: "nice",
        forgiveness: "forgiving",
        function: titForTatStrategy,
    },

    {
        title: "Always Cooperate",
        description: "Cooperates in every round",
        nature: "nice",
        forgiveness: "forgiving",
        function: alwaysCooperate,
    },
    {
        title: "Always Defect",
        description: "Defects in every round",
        nature: "nasty",
        forgiveness: "unforgiving",
        function: alwaysDefect,
    },
    {
        title: "Grudger",
        description: "Cooperates until the opponent defects, then defects forever",
        nature: "nice",
        forgiveness: "unforgiving",
        function: grudgerStrategy,
    },
    {
        title: "Pavlov",
        description: "Cooperates if both players' moves are the same in the last round, otherwise, defects",
        nature: "nice",
        forgiveness: "forgiving",
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
        <span class="capitalize-first badge text-bg-${strategy.nature === "nice" ? "success" : "warning"}">${strategy.nature}</span>
        <span class="capitalize-first badge text-bg-${strategy.forgiveness === "forgiving" ? "success" : "warning"}">${strategy.forgiveness}</span>
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




// strategies

// Function for Random strategy
function randomStrategy(opponent, history) {
    // Randomly choose "cooperate" or "defect"
    return Math.random() < 0.5 ? "cooperate" : "defect";
}

// Function for Sample (Tit for Two Tats) strategy
function sampleStrategy(opponent, history) {
    // Start by cooperating
    if (history.length === 0) {
        return "cooperate";
    }

    // Defect only after opponent had defected twice in a row
    const lastTwoMoves = history.slice(-2);
    if (lastTwoMoves.every(move => move[opponent] === "defect")) {
        return "defect";
    }

    return "cooperate";
}

// Function for Friedman strategy
function friedmanStrategy(opponent, history) {
    // Start by cooperating
    if (history.length === 0) {
        return "cooperate";
    }

    // Defect if opponent defected once
    if (history.some(round => round[opponent] === "defect")) {
        // Return to cooperate if opponent cooperates again
        if (history[history.length - 1][opponent] === "cooperate") {
            return "cooperate";
        } else {
            return "defect";
        }
    }

    return "cooperate";
}


// Function for Joss strategy
function jossStrategy(opponent, history) {
    // Start by cooperating
    if (history.length === 0) {
        return "cooperate";
    }

    // Copy opponent's last move 90% of the time, otherwise, defect
    return Math.random() < 0.9 ? history[history.length - 1][opponent] : "defect";
}

// Function for Tit For Tat strategy
function titForTatStrategy(opponent, history) {
    // Start by cooperating
    if (history.length === 0) {
        return "cooperate";
    }

    // Copy opponent's last move
    return history[history.length - 1][opponent];
}
// Cooperate always
function alwaysCooperate() {
    return "cooperate";
}

// Defect always
function alwaysDefect() {
    return "defect";
}

// Grudger (also known as "Tit for Tat with Forgiveness")
function grudgerStrategy(opponent, history) {
    // Start by cooperating
    if (history.length === 0) {
        return "cooperate";
    }

    // Defect if opponent defected at least once, otherwise, cooperate
    if (history.some(round => round[opponent] === "defect")) {
        return "defect";
    } else {
        return "cooperate";
    }
}

// Pavlov (also known as "Win-Stay, Lose-Shift")
function pavlovStrategy(opponent, history) {
    // Start by cooperating
    if (history.length === 0) {
        return "cooperate";
    }

    // Cooperate if both players' moves are the same in the last round, otherwise, defect
    if (history[history.length - 1][opponent] === history[history.length - 1].Pavlov) {
        return "cooperate";
    } else {
        return "defect";
    }
}
// end of strategies

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
            if (player1Move == "cooperate" && player2Move == "cooperate") {
                p1score += 3
                p2score += 3
            } else if (player1Move == "defect" && player2Move == "defect") {
                p1score += 1
                p2score += 1
            } else if (player1Move == "cooperate" && player2Move == "defect") {
                p1score += 0
                p2score += 5
            } else if (player1Move == "defect" && player2Move == "cooperate") {
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
                     
                         ${round + 1 === 1 ? "Player 1: " : ""}  ${player1Move === "cooperate" ? `<span class="badge rounded-pill text-bg-success">C</span>` : `<span class="badge rounded-pill text-bg-warning">D</span>`}
                        <br>
                        ${round + 1 === 1 ? "Player 2: " : ""} ${player2Move === "cooperate" ? `<span class="badge rounded-pill text-bg-success">C</span>` : `<span class="badge rounded-pill text-bg-warning">D</span>`}
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
            //             P1 ${player1Move === "cooperate" ? "C" : "D"}
            //             <br>
            //             P2 ${player2Move === "cooperate" ? "C" : "D"}
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



