// Function for Tit For Tat strategy
function titForTatStrategy(opponent, history) {
    // Start by cooperating
    if (history.length === 0) {
        return "coopère";
    }

    // Copy opponent's last move
    return history[history.length - 1][opponent];
}