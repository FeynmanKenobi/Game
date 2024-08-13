// Function to populate the list group
function populateList() {

    strategies.forEach(strategy => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
        <h5>${strategy.title}</h5>
        <span class="capitalize-first badge text-bg-${strategy.nature === "gentil" ? "success" : "warning"}">${strategy.nature}</span>
        <span class="capitalize-first badge text-bg-${strategy.forgiveness === "indulgent" ? "success" : "warning"}">${strategy.forgiveness}</span>
        <p><strong>Description:</strong> ${strategy.description}</p>

      `;
        listGroup.appendChild(listItem);
    });
}