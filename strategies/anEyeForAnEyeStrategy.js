// Function for anEyeForAnEyeStrategy
function anEyeForAnEyeStrategy(opponent, history) {
    // Start by cooperating
    if (history.length === 0) {
        return "coopère";
    }

    // trahit if opponent defected once
    if (history.some(round => round[opponent] === "trahit")) {
        // Return to coopère if opponent cooperates again
        if (history[history.length - 1][opponent] === "coopère") {
            return "coopère";
        } else {
            return "trahit";
        }
    }

    return "coopère";
}
