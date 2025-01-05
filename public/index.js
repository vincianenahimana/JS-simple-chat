const socket = io();

// Sélectionner les éléments DOM
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesContainer = document.getElementById('messagesContainer');
const typing = document.getElementById('typing');

// Fonction d'affichage des messages
function displayMessage(msg, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(type);
    messageElement.textContent = msg;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll automatique
}

// 4. Écouter le bouton pour envoyer un message
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        // Afficher immédiatement comme message envoyé
        displayMessage(message, 'sent');

        // Envoyer le message au serveur (texte uniquement)
        socket.emit('message', message);

    }
});

// 5. Écouter les messages reçus du serveur
socket.on('message', (messageData) => {
    const { author, text } = messageData;

    // Vérifier si le message provient d'un autre utilisateur
    if (author !== socket.id) {
        displayMessage(text, 'received');
    }
});
