import padraoRespostas from "./respostas.js";

console.log("padraoRespostas", padraoRespostas);


const messagesdiv = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendButton = document.getElementById("sendBtn");

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
    let tempmsg = appendMessage("bot", "•••");
    setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        appendMessage("bot", botResponse);
        messagesdiv.removeChild(tempmsg);
    }, 1000);
}

function appendMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    messagesdiv.appendChild(messageDiv);
    messagesdiv.scrollTop = messagesdiv.scrollHeight;
    return messageDiv;
}


function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    for (const key in padraoRespostas) {
        const keyParts = key.toLowerCase().split(/[\s_]+/); 
        
        if (lowerMessage.includes(key.toLowerCase())) {
            const responses = padraoRespostas[key];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        for (const part of keyParts) {
            if (part.length > 2 && lowerMessage.includes(part)) { 
                const responses = padraoRespostas[key];
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
    }
    return "Desculpe, não entendi. Pode reformular?";
}