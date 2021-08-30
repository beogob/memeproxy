const express = require("express");
const request = require("request");

const app = express();
var port = 80; // http port

app.get('/', function (req, res) {
  res.send("octet, png");
})

app.get('/png/*', function (req, res) {
    try {
        let site = req.url.replace("/png", "");
        request({encoding: "binary", gzip: true, method: "GET", uri: `https:/${site}`}, (_e, _r, body) => {
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': body.length
            });
            res.end(body, "binary");
    
        })
    } catch (e) {
        res.status(500).send("Error");
    }
});

app.get('/octet/*', function (req, res) {
    try {
        let site = req.url.replace("/octet", "");
        request({encoding: "binary", gzip: true, method: "GET", uri: `https:/${site}`}, (_e, _r, body) => {
            res.writeHead(200, {
                'Content-Type': 'application/octet-stream',
                'Content-Length': body.length
            });
            res.end(body, "binary");
    
        })
    } catch (e) {
        res.status(500).send("Error");
    }
});

app.listen(port, function () { console.log(`Started proxy on port ${port};`)});
