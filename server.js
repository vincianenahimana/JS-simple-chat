import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

// Initialisation de l’application
const app = express();
const server = createServer(app);
const io = new Server(server);

// Gestion des connexions WebSocket
io.on("connection", (socket) => {
    console.log(`Utilisateur connecté avec l'ID : ${socket.id}`);

    // Recevoir et diffuser les messages
    socket.on('message', (msg) => {
        const messageData = {
            author: socket.id,
            text: msg,
        };
        // Diffuser aux autres utilisateurs
        socket.broadcast.emit('message', messageData);
        console.log(`Message diffusé: ${msg}`);
    });

    // Déconnexion d'un utilisateur
    socket.on('disconnect', () => {
        console.log(`Utilisateur déconnecté : ${socket.id}`);
    });
});

// Configuration des fichiers statiques
app.use(express.static("public"));

// Lancer le serveur
server.listen(3000, () => {
    console.log('Le serveur écoute sur http://localhost:3000');
});
