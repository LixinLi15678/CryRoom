var firebaseConfig = {
    apiKey: "AIzaSyCF6KsAQiz8kSD-XV8tFbIv0Zy7fbgIo2I",
    authDomain: "cryroom-e063f.firebaseapp.com",
    projectId: "cryroom-e063f",
    storageBucket: "cryroom-e063f.appspot.com",
    messagingSenderId: "1077524899177",
    appId: "1:1077524899177:web:fec699a01494574df9c9f8"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// References to the database for messages and online user count
var messagesRef = firebase.database().ref('messages');
var onlineUsersRef = firebase.database().ref('onlineUsers');

// Track each user's presence
var currentUserRef; 
firebase.database().ref('.info/connected').on('value', function(snapshot) {
    if (snapshot.val() && !currentUserRef) {
        currentUserRef = onlineUsersRef.push(true); // Add user to the list of online users
        currentUserRef.onDisconnect().remove(); // Remove them when they disconnect
    }
});

// Function to display messages with random styles
function displayMessage(text, style) {
    var messagesContainer = document.getElementById('messages');
    var messageElement = document.createElement('div');
    messageElement.textContent = text;
    if (style) {
        messageElement.style.fontFamily = style.font;
        messageElement.style.fontSize = style.size;
        messageElement.style.color = style.color;
    }
    messagesContainer.appendChild(messageElement);
}

// Listen for new messages
messagesRef.on('child_added', function(snapshot) {
    var messageData = snapshot.val();
    displayMessage(messageData.text, messageData.style);
});

// Update online user count
onlineUsersRef.on('value', function(snapshot) {
    var userCountDisplay = document.getElementById('user_count');
    userCountDisplay.textContent = 'Online Users: ' + snapshot.numChildren();
});

function sendMessage() {
    var input = document.getElementById('message_input');
    var message = input.value.trim();
    if (message) {
        messagesRef.push({
            text: message,
            style: getRandomStyle(),
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        if (message.toLowerCase() === "brad mcdanel" || message.toLowerCase() === "brad" || message.toLowerCase() === "mcdanel"
            || message.toLowerCase() === "professor mcdanel" || message.toLowerCase() === "prof mcdanel"){
            triggerSpecialAnimation();
        }

        input.value = '';
    }
}


// Generate random style properties
function getRandomStyle() {
    const fonts = ['Arial', 'Verdana', 'Courier New', 'Georgia', 'Times New Roman', 'Comic Sans MS'];
    const sizes = ['16px', '18px', '20px', '22px', '24px', '26px'];
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff', '#8B0000', '#000080'];
    return {
        font: fonts[Math.floor(Math.random() * fonts.length)],
        size: sizes[Math.floor(Math.random() * sizes.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
    };
}

// Send message when enter key is pressed
document.getElementById('message_input').addEventListener('keypress', function(event) {
    if (event.keyCode === 13) { // Enter key
        event.preventDefault();
        sendMessage();
    }
});

// Cry button functionality
function cry() {
    var cryButton = document.getElementById('cry_button');
    if (!cryButton.disabled) {
        messagesRef.push({
            text: "😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭",
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
        animateCryingEmoji(); // Create the crying emoji animation
        cryButton.disabled = true;
        setTimeout(function() {
            cryButton.disabled = false;
        }, 5000); 
    }
}

function animateCryingEmoji() {
    var body = document.body;
    var emojiCount = 60; 

    for (let i = 0; i < emojiCount; i++) {
        var emoji = document.createElement('div');
        emoji.textContent = '😭'; 
        emoji.className = 'cryingEmoji';
        emoji.style.left = (Math.random() * (window.innerWidth - 50)) + 'px'; // Random horizontal position
        emoji.style.top = (Math.random() * (window.innerHeight - 50)) + 'px'; // Random vertical position

        body.appendChild(emoji);

        // Remove the emoji after the animation ends
        setTimeout(() => {
            if (body.contains(emoji)) {
                body.removeChild(emoji);
            }
        }, 4000); 
    }
}

function triggerSpecialAnimation() {
    const animationContainer = document.createElement('div');
    animationContainer.id = 'special-animation';
    animationContainer.innerHTML = `<div class="hearts"></div><div class="flash-message">Best Professor</div>`;

    document.body.appendChild(animationContainer);

    const heartsContainer = animationContainer.querySelector('.hearts');
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤️'; 
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heartsContainer.appendChild(heart);
    }

    const flashMessage = animationContainer.querySelector('.flash-message');
    flashMessage.style.opacity = 1; 

    setTimeout(() => {
        document.body.removeChild(animationContainer);
    }, 4000);
}