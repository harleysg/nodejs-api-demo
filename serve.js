const express = require('express');
const app = express();
let isServeListening = () => console.log(`listening on http://localhost:${port}`);
// const serve = app.listen(1234, isServeListening);
const port = process.env.PORT || 3000;
const www = process.env.WWW || './';

// START SERVER
app.use(express.static(www));
app.listen(port, () => isServeListening);
// START SERVER
app.get('/search/:word', searchword);
app.get('/add/:word/:score?', addword);
app.get('/all', getAllword);

let words = {
    "foo": 0,
    "rainbow": 2,
    "unicorn": 5
}

function addword(req, res) {
    let { word, score } = req.params;
    let reply;
    if (!score) {
        reply = {
            "msn": `score is required`
        }
    } else {
        words[word] = Number(score);
        reply = {
            "msn": `thank you for your word ${word}`
        }
    }
    res.send(reply);
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

app.get('*', (req, res) => {
    console.log(res);
    res.sendFile(`index.html`, { root: www });
});