function multipleMatches() {
    console.log(""totalPointsString"");
    let results = [];

    for (let i = 0; i < strategies.length; i++) {

        let currentStrategyTotalScore = 0
        const currentStrategy = strategies[i];

        for (let j = 0; j < strategies.length; j++) {

            const opponentStrategy = strategies[j];

            for (let k = 0; k < 10000; k++) {
                let history = optimizedMatch(currentStrategy, opponentStrategy);
                let lastElement = history.pop();
                currentStrategyTotalScore += lastElement["p1score"];
            }
        }

        results.push({
            strategyTitle : currentStrategy.title,
            totalScore : currentStrategyTotalScore
        });

        // update score on ui
        //p1Totalscoreui.innerText = p1Totalscore;
        //p2Totalscoreui.innerText = p2Totalscore;

        //console.log(p1Totalscore);
        //console.log(p2Totalscore);
    }

    results.sort((a, b) => b.totalScore - a.totalScore);

    for (let i = 0; i < results.length; i++) {
        let totalPointsString = results[i].strategyTitle + " = " + results[i].totalScore;
        console.log(totalPointsString);
    }
}