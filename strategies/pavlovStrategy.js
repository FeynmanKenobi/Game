// Pavlov (also known as "Win-Stay, Lose-Shift")
function pavlovStrategy(opponent, history) {
    // Start by cooperating
    if (history.length === 0) {
        return "coopère";
    }

    // coopère if both players' moves are the same in the last round, otherwise, trahit
    if (history[history.length - 1][opponent] === history[history.length - 1].Pavlov) {
        return "coopère";
    } else {
        return "trahit";
    }
}