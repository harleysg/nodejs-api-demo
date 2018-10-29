const fs = require('fs');
const express = require('express');
const app = express();
// const serve = app.listen(1234, isServeListening);
const port = process.env.PORT || 3000;
const www = process.env.WWW || './';
let isServeListening = () => console.log(`listening on http://localhost:${port}`);

let jsonFile = './src/words.json';
let dataJson = fs.readFileSync(jsonFile);
let words = JSON.parse(dataJson);

// START SERVER
app.use(express.static(www));
app.listen(port, () => isServeListening);
// DEFINE POINTS SERVER
app.get('/search/:word', searchword);
app.get('/add/:word/:score?', addword);
app.get('/all', getAllword);
app.get('./src/words.json', defaultPoint);
app.get('*', defaultPoint);
// FUNCTIONS by PORTS
function defaultPoint(req, res) {
    res.sendFile(`index.html`, { root: www });
}
function addword(req, res) {
    let { word, score } = req.params;
    let reply;

    if (!score) {
        reply = {
            status: "Error",
            msn: `score is required`
        }
        res.send(reply);
    } else {
        words[word] = Number(score);
        let newData = JSON.stringify(words, null, 4);
        fs.writeFile(jsonFile, newData, finishWriteFile);

        function finishWriteFile(err) {
            reply = {
                status: "succes",
                word: word,
                score: score
            }
            res.send(reply);
        }
    }
}
function getAllword(req, res) {
    res.send(words);
}
function searchword(req, res) {
    let { word } = req.params;
    let reply;
    if (words[word]) {
        reply = {
            status: "found",
            word: word,
            score: words[word]
        }
    } else {
        reply = {
            status: "not found",
            word: word
        }
    }
    res.send(reply);
}