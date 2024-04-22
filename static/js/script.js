var socket = io();

function sendMessage() {
    var input = document.getElementById('message_input');
    socket.emit('message', {text: input.value});
    input.value = '';
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
