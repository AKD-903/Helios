const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    appendMessage(message, 'user');
    userInput.value = '';

    // Simulate bot response (replace with actual chatbot logic)
    setTimeout(() => {
        const botResponse = getBotResponse(message);
        appendMessage(botResponse, 'bot');
    }, 500);
}

function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

function getBotResponse(message) {
    // Replace with actual chatbot logic (API calls, decision trees, etc.)
    return `Bot says: I received "${message}"`;
}
