// Function for Random strategy
function randomStrategy(opponent, history) {
    // Randomly choose "coopère" or "trahit"
    return Math.random() < 0.5 ? "coopère" : "trahit";
}