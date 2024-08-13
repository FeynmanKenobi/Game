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