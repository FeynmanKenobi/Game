// Function for Joss strategy
function jossStrategy(opponent, history) {
    // Start by cooperating
    if (history.length === 0) {
        return "coopère";
    }

    // Copy opponent's last move 90% of the time, otherwise, trahit
    return Math.random() < 0.9 ? history[history.length - 1][opponent] : "trahit";
}