import padraoRespostas from "./respostas.js";

console.log("padraoRespostas", padraoRespostas);

//Pegar elementos do documento//
const messagesdiv = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendButton = document.getElementById("sendBtn");
const botStatus = document.getElementById("botstatus");

//Checar se a caixa de texto está focada, se sim mudar a cor de fundo//
let isFocused = false;
input.addEventListener("focus", () => {
    isFocused = true;
    input.style.backgroundColor = "#1b0e25";
});

input.addEventListener("blur", () => {
    isFocused = false;
    input.style.backgroundColor = "";
});


//Eventos para enviar as mensagens com clique no botão ou enter//
sendButton.addEventListener("click", sendMessage);

input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

//Funções do Chat//
function sendMessage() {
    const userMessage = input.value.trim();
    if (userMessage === "") return;

    appendMessage("user", userMessage);
    input.value = "";
    botStatus.textContent = "Digitando...";
    //typing balloon
    let tempmsg = appendMessage("bot", "•••");
    setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        appendMessage("bot", botResponse);
        messagesdiv.removeChild(tempmsg);
        botStatus.textContent = "Online";
    }, 2000);

    setTimeout(() => {
        botStatus.textContent = "Ausente";
    }, 4000);
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
    const lowerMessage = userMessage.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
    const responses = padraoRespostas["default"];
    return responses[Math.floor(Math.random() * responses.length)];
}