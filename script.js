// Predefined chatbot responses for simple conversation
const botResponses = {
    "hello": "Hello! How can I assist you today?",
    "hi": "Hi! How can I help you?",
    "hii": "Hello! How can I assist you?",
    "how are you": "I'm just a bot, but I'm here to help!",
    "what is your name": "I'm ChatBot, your virtual assistant.",
    "who are you": "I'm a friendly chatbot here to assist you.",
    "bye": "Goodbye! Have a great day!",
    "default": "Sorry, I don't understand. Can you rephrase?",
    "are you a human": "no, I am a AI model"
};

// Function to add a message to the chatbox
function addMessageToChatbox(message, isUser) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', isUser ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}

// Function to handle user message and bot response
async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim().toLowerCase();
    if (userInput === "") return;

    addMessageToChatbox(userInput, true); // Add user message
    document.getElementById('user-input').value = ''; // Clear the input field

    // Show loading animation
    addLoadingAnimation();

    // Simulate a slight delay to mimic API response time
    setTimeout(async () => {
        removeLoadingAnimation();
        const response = await getBotResponse(userInput);
        addMessageToChatbox(response, false); // Add bot response
    }, 1000);
}

// Simulate API call to get bot response (replace with actual Google Gemini API)
async function getBotResponse(message) {
    return botResponses[message] || botResponses['default'];
}

// Loading Animation
function addLoadingAnimation() {
    const chatBox = document.getElementById('chat-box');
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('loading');
    loadingElement.id = 'loading'; // Set ID for easy removal
    chatBox.appendChild(loadingElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

function removeLoadingAnimation() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.remove();
    }
}

// Emoji Picker
function toggleEmojiPicker() {
    const picker = document.getElementById('emoji-picker');
    picker.style.display = picker.style.display === 'none' ? 'block' : 'none';
}

function addEmoji(emoji) {
    const input = document.getElementById('user-input');
    input.value += emoji;
    toggleEmojiPicker(); // Close emoji picker after selection
}

// Image Upload Functionality
function handleImageUpload() {
    const input = document.getElementById('image-upload');
    if (input.files && input.files[0]) {
        const file = input.files[0];
        addMessageToChatbox(`You uploaded: ${file.name}`, true);
        // Placeholder bot response for image upload
        setTimeout(() => {
            addMessageToChatbox("Thanks for the image! I can't process images yet.", false);
        }, 1000);
    }
}
