var socket = io();
var cryCooldown = false;

function sendMessage() {
    var input = document.getElementById('message_input');
    socket.emit('message', {text: input.value});
    input.value = '';
}

function cry() {
    var cryButton = document.getElementById('cry_button');
    if (!cryButton.disabled) {
        socket.emit('try_cry');
        animateCryingEmoji();
        cryButton.disabled = true;
        setTimeout(() => {
            cryButton.disabled = false;
        }, 5000); // Reset the cooldown after 5 seconds
    }
}

function animateCryingEmoji() {
    var body = document.body;
    var emojiCount = 50; 

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
        }, 2000); 
    }
}


function displayPopup(message) {
    var popup = document.getElementById("message");
    popup.innerHTML = message;
    popup.style.display = "block";
    setTimeout(function(){
        popup.style.display = "none";
    }, 3000); // Close the pop-up after 3 seconds
}



socket.on('broadcast message', function(data) {
    var messages = document.getElementById('messages');
    var message = document.createElement('div');
    message.textContent = data.text;

    // Apply the styles
    message.style.fontFamily = data.style.font;
    message.style.fontSize = data.style.size;
    message.style.color = data.style.color;

    messages.appendChild(message);
});


socket.on('user count update', function(data) {
    var userCountDisplay = document.getElementById('user_count');
    userCountDisplay.textContent = 'Online Users: ' + data.count;
});

socket.on('cry', function(data) {
    var messages = document.getElementById('messages');
    var message = document.createElement('div');
    message.innerHTML = data.emojis;
    messages.appendChild(message);
});
