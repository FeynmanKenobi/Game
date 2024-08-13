function multipleMatches() {
    let p1Totalscore = 0
    let p2Totalscore = 0

    for (let i = 0; i < 1000; i++) {
        let history = optimizedMatch();
        let lastElement = history.pop();
        p1Totalscore += lastElement["p1score"];
        p2Totalscore += lastElement["p2score"];
    }

    // update score on ui
    p1Totalscoreui.innerText = p1Totalscore;
    p2Totalscoreui.innerText = p2Totalscore;

    console.log(p1Totalscore);
    console.log(p2Totalscore);
}