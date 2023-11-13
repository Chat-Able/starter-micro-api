var http = require('http');
http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    res.write('Yo!');
    res.end();
}).listen(process.env.PORT || 3000);

const fs = require('fs');
const readline = require('readline');
function add(content) {
    fs.appendFile('CHATS.txt', content, err => {
        if (err) {
            console.error(err);
        }
    });
}

const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

let sockets = [];

server.on('connection', function (socket) {
    sockets.push(socket);

    /*let lines = [];

    const readInterface = readline.createInterface({
        input: fs.createReadStream('CHATS.txt'),
        output: process.stdout,
        console: false
    });

    readInterface.on('line', function (line) {
        lines.push(line);
    });

    readInterface.on('close', function () {
        setTimeout(function () {
            lines.forEach(s => socket.send(s))
        }, 2000);
    });*/

    socket.on('message', function (msg) {
        if (!(msg == "ABLECHAT-=[{CLEARCHAT}]")) {
            add("\n" + msg)
        }
        sockets.forEach(ad => ad.send("ABLECHAT-=[{CLEARCHAT}]"))

        let lines = [];

        const readInterface2 = readline.createInterface({
            input: fs.createReadStream('CHATS.txt'),
            output: process.stdout,
            console: false
        });

        readInterface2.on('line', function (line) {
            lines.push(line);
        });

        readInterface2.on('close', function () {
            setTimeout(function () {
                lines.forEach(s => socket.send(s))
            }, 10);
        });

        socket.on('close', function () {
            sockets = sockets.filter(s => s !== socket);
        });
    });
})
