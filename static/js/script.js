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
        cryButton.disabled = true;
        cryButton.style.backgroundColor = 'gray';  // Change button color to gray
        setTimeout(() => {
            cryButton.disabled = false;
            cryButton.style.backgroundColor = '';  // Reset button color
        }, 5000); // Reset the cooldown after 5 seconds
    }
}

socket.on('broadcast message', function(data) {
    var messages = document.getElementById('messages');
    var message = document.createElement('div');
    message.textContent = data.text;
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
