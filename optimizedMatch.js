function optimizedMatch() {
    console.log("Starting the match");

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
                let lastElement = history.pop();
                let matchHistoryString = "Match history: player 1 = " + lastElement["p1score"] + ", player 2 = " + lastElement["p2score"];
                console.log(matchHistoryString);
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