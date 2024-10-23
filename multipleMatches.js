/*function multipleMatches() {
    for (let i = 0; i < strategies.length; i++) {

        let currentStrategyTotalScore = 0
        const currentStrategy = strategies[i];

        for (let j = 0; j < strategies.length; j++) {

            const opponentStrategy = strategies[j];

            for (let k = 0; k < 1000; k++) {
                let history = optimizedMatch(currentStrategy, opponentStrategy);
                let lastElement = history.pop();
                currentStrategyTotalScore += lastElement["p1score"];
            }
        }

        addStrategy({ strategyTitle: currentStrategy.title, totalScore: currentStrategyTotalScore });
        sortTable('rankingTable', 1);
    }
}*/

function multipleMatches() {
    let i = 0;

    function processNextStrategy() {
        if (i >= strategies.length) {
            return; // All strategies processed
        }

        let currentStrategyTotalScore = 0;
        const currentStrategy = strategies[i];

        for (let j = 0; j < strategies.length; j++) {
            const opponentStrategy = strategies[j];

            let currentStrategyScore = 0;
            let opponentStrategyScore = 0;

            for (let k = 0; k < 10000; k++) {
                let history = optimizedMatch(currentStrategy, opponentStrategy);
                let lastElement = history.pop();
                currentStrategyScore += lastElement["p1score"];
                opponentStrategyScore += lastElement["p2score"];
                currentStrategyTotalScore += lastElement["p1score"];
            }

            const liveUpdate = document.getElementById('liveUpdate');
            const matchHistoryString = "Confrontation : " + currentStrategy.title + " = " + currentStrategyScore.toLocaleString() + ", " + opponentStrategy.title + " = "  + opponentStrategyScore.toLocaleString();
            liveUpdate.innerHTML = matchHistoryString;
        }

        var elements = document.getElementsByClassName('new-entry');
        while(elements.length > 0){
            elements[0].classList.remove('new-entry');
        }

        addStrategy({ strategyTitle: currentStrategy.title, totalScore: currentStrategyTotalScore });
        sortTable('rankingTable', 1);

        const myrow = document.getElementById(currentStrategy.title)
        myrow.classList.add('new-entry');

        i++;
        setTimeout(processNextStrategy, 0); // Schedule the next iteration
    }

    processNextStrategy(); // Start the first iteration
}

function addStrategy(result) {

    results.push(result);
    const row = document.getElementById(result.strategyTitle);
    const score = row.childNodes[1];
    score.innerHTML = result.totalScore.toLocaleString();
}

function sortTable(table_id, sortColumn){
    var tableData = document.getElementById(table_id).getElementsByTagName('tbody').item(0);
    var rowData = tableData.getElementsByTagName('tr');            
    for(var i = 0; i < rowData.length - 1; i++){
        for(var j = 0; j < rowData.length - (i + 1); j++){
            if(Number(rowData.item(j).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, "")) < Number(rowData.item(j+1).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, ""))){
                tableData.insertBefore(rowData.item(j+1),rowData.item(j));
            }
        }
    }
}
