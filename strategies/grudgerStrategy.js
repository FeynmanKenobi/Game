// Grudger (also known as "Tit for Tat with Forgiveness")
function grudgerStrategy(opponent, history) {
    // Start by cooperating
    if (history.length === 0) {
        return "coopère";
    }

    // trahit if opponent defected at least once, otherwise, coopère
    if (history.some(round => round[opponent] === "trahit")) {
        return "trahit";
    } else {
        return "coopère";
    }
}