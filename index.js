"use strict";

const port = 5007;

///////////////////////////////////////////////////////

let WebSocketServer = new require("ws");

let portNumber = process.env.PORT || port;
let  webSocketServer = new WebSocketServer.Server({
    port: portNumber
});

let clients = {};
let nameCounter = 1;

function sendToAllClients(message) {
    for (let key in clients) {
        try {
            clients[key].send(message);
        } catch (err) {
            // err
        }
    }
}

let messagesArr = [];

webSocketServer.on("connection", function(ws) {
    let id = "id_" + nameCounter;
    nameCounter++;
    clients[id] = ws;
    console.log("новое соединение " + id);

    ws.on("message", function(message) {
        if(message === "HELLO_MESSAGE") {
            console.log(message);
        } else {
            console.log(message);
            messagesArr.push(message);
        }
    });

    ws.on("close", function() {
        console.log('соединение закрыто ' + id);
        try {
            delete clients[id];
        } catch (err) {
            // err
        }
    });
});

let t1 = setInterval(() => {
    sendToAllClients(JSON.stringify(messagesArr));
}, 250);