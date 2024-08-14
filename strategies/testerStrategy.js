function testerStrategy(opponent, history) {
    // Start by defecting (to see how the opponent will react)
    if (history.length === 0) {
        return "trahit";
    }

    // Start by defecting (to see how the opponent will react)
    if (history.length === 1) {
        return "coopère";
    }

    // Si l'adversaire
    if (history[1][opponent] === "trahit") {
        return "coopère";
    } else {
        return "trahit";
    }
}