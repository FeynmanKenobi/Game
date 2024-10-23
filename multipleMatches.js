function multipleMatches() {        
    for(var i = 0; i < strategies.length - 1; i++){
        setStrategyScore(strategies[i].title, 0);
    }
    
    const processNextStrategy = (strategyIndex) => {
        if (strategyIndex >= strategies.length) {
            clearNewEntryClass();

            return; // All strategies processed
        }

        let currentStrategyTotalScore = 0;
        const currentStrategy = strategies[strategyIndex];

        const processNextMatch = (matchIndex) => {
            if (matchIndex >= strategies.length) {
                addStrategy({ strategyTitle: currentStrategy.title, totalScore: currentStrategyTotalScore });
                sortTable('rankingTable', 1);

                const myrow = document.getElementById(currentStrategy.title);
                myrow.classList.add('new-entry');

                setTimeout(() => processNextStrategy(strategyIndex + 1), 500);

                return; // All matches processed
            }

            const opponentStrategy = strategies[matchIndex];

            let currentStrategyScore = 0;
            let opponentStrategyScore = 0;

            for (let k = 0; k < 200; k++) {
                let history = optimizedMatch(currentStrategy, opponentStrategy);
                let lastElement = history.pop();
                currentStrategyScore += lastElement["p1score"];
                opponentStrategyScore += lastElement["p2score"];
                currentStrategyTotalScore += lastElement["p1score"];
            }
            
            let confrontationResultString = "";
            if (currentStrategyScore > opponentStrategyScore) {
                confrontationResultString = currentStrategy.title + " VS " + opponentStrategy.title + " : victoire de " + currentStrategy.title + " " + currentStrategyScore.toLocaleString() + " à " + opponentStrategyScore.toLocaleString();
                insertLiveUpdateP(confrontationResultString, "green");
            } else if (currentStrategyScore < opponentStrategyScore) {
                confrontationResultString = currentStrategy.title + " VS " + opponentStrategy.title + " : défaite de " + currentStrategy.title + " " + currentStrategyScore.toLocaleString() + " à " + opponentStrategyScore.toLocaleString();
                insertLiveUpdateP(confrontationResultString, "red");
            } else {
                confrontationResultString = currentStrategy.title + " VS " + opponentStrategy.title + " : égalité " + currentStrategyScore.toLocaleString() + " à " + opponentStrategyScore.toLocaleString();
                insertLiveUpdateP(confrontationResultString, "orange");
            }

            requestAnimationFrame(() => {
                setTimeout(() => processNextMatch(matchIndex + 1), 500);
            });
        };

        processNextMatch(0);

        clearNewEntryClass();
    };

    processNextStrategy(0);
}

function insertLiveUpdateP(confrontationResultString, color) {
    const liveUpdateDiv = document.getElementById('liveUpdate');
    const liveUpdateP = document.createElement("div");
    liveUpdateP.innerHTML = confrontationResultString;
    liveUpdateP.style.color = color;
    liveUpdateP.style.fontWeight = 'bold'
    liveUpdateDiv.insertBefore(liveUpdateP, liveUpdateDiv.firstChild);
}

function setStrategyScore(strategyTitle, score) {
    const row = document.getElementById(strategyTitle);
    const scoreNode = row.childNodes[1];
    scoreNode.innerHTML = "<b>" + score+ "</b>";
}

function clearNewEntryClass() {
    var elements = document.getElementsByClassName('new-entry');

    while (elements.length > 0) {
        elements[0].classList.remove('new-entry');
    }
}

function addStrategy(result) {
    results.push(result);
    setStrategyScore(result.strategyTitle, result.totalScore.toLocaleString());
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
