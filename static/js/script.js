var socket = io();

function sendMessage() {
    var input = document.getElementById('message_input');
    socket.emit('message', {text: input.value});
    input.value = '';
}

function cry() {
    const messages = document.getElementById('messages');
    const message = document.createElement('div');
    message.innerHTML = '😭😭😭😭😭😭😭😭😭';
    messages.appendChild(message);
    document.getElementById('cry_button').disabled = true;
    setTimeout(() => {
        document.getElementById('cry_button').disabled = false;
    }, 5000);
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