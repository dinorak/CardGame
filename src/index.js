const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

let btnPressed = false;

io.on("connect", (socket) => {
    console.log("socket", socket);

    // Handle events when a player makes a move
    socket.on("playerMove", (data) => {
        if (data) {
            // Handle player move logic if needed
            console.log("Player move:", data);
        }
    });

    socket.on("choosePlayer", ({ player }) => {
        if (player == "player1") {
            socket.emit('playerAssigned', { player: 'player1' });
        } else if (player == "player2") {
            socket.emit('playerAssigned', { player: 'player2' });
        }

        io.emit("playersUpdated", { player });
    });

    socket.on("updateLobby", ({ player }) => {
        io.emit("updateLobby", { player });
    });

    socket.on("btnStateChanged", ({ btnPressed: newBtnPressed }) => {
        btnPressed = newBtnPressed;
        io.emit("btnStateChanged", { btnPressed });
    });

    socket.on("activateAcceptBtn", ({}) => {
        io.emit("activateAcceptBtn", ({}));
    });

    socket.on("summonCharacter", ({ card }) => {
        io.emit("summonCharacter", { card });
    });

    socket.on("cardPlayMain1", ({ select, chosenCard }) => {
        // Handle card play logic if needed
        io.emit("cardPlayMain1", { select, chosenCard });
    });
    
    socket.on("enemySummonCharacter", ({ sender, select, chosenCard }) => {
        // Handle enemy card play logic if needed
        io.emit("enemySummonCharacter", { sender, select, chosenCard });
    })
});

// This line should be outside the io.on("connect", ...) block
app.use(express.static("public"));

httpServer.listen(3000, () => {
    console.log("Listening on port 3000");
});
