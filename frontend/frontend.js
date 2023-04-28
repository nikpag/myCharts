const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("."))

pagenames = [
    "/1-myCharts-landing.html",
    "/2-new-user.html",
    "/3-account.html",
    "/4-my-charts.html",
    "/5-new-chart.html",
    "/7-credits.html",
    "/8-new-chart-done.html",
    "/9-about-us.html",
]

for (let pagename of pagenames) {
    app.get(pagename, function (req, res) {
        res.sendFile(path.join(__dirname, pagename));
    })
}

app.listen(3000, function () {
    console.log("Server started");
})