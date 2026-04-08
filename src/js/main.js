messagesdiv = document.getElementById("chat");
input = document.getElementById("userInput");
sendButton = document.getElementById("sendBtn");

sendButton.addEventListener("click", sendMessage);

input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});


function sendMessage() {
    const userMessage = input.value.trim();
    if (userMessage === "") return;

    appendMessage("user", userMessage);
    input.value = "";
    //typing balloon
    appendMessage("bot", "...");
    setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        appendMessage("bot", botResponse);
    }, 1000);
}

function appendMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    messagesdiv.appendChild(messageDiv);
    messagesdiv.scrollTop = messagesdiv.scrollHeight;
}

function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
        return "Hello! How can I assist you today?";
    }
}