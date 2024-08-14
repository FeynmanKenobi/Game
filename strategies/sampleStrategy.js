// Function for Sample (Tit for Two Tats) strategy
function sampleStrategy(opponent, history) {
    // Start by cooperating
    if (history.length === 0) {
        return "coopère";
    }

    // trahit only after opponent had defected twice in a row
    const lastTwoMoves = history.slice(-2);
    if (lastTwoMoves.length === 2 && lastTwoMoves.every(move => move[opponent] === "trahit")) {
        return "trahit";
    }

    return "coopère";
}