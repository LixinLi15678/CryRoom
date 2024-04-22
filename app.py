from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secure_random_secret_key_here'  # Ensure you use a secure, randomly generated key.
socketio = SocketIO(app)

connected_users = 0

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('message')
def handle_message(data):
    # Generate random styles
    fonts = ['Arial', 'Verdana', 'Courier New', 'Georgia', 'Times New Roman', 'Comic Sans MS']
    sizes = ['16px', '18px', '20px', '22px', '24px', '26px']
    colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff', '#8B0000', '#000080']

    style = {
        'font': random.choice(fonts),
        'size': random.choice(sizes),
        'color': random.choice(colors)
    }

    # Attach the style to the message data
    data['style'] = style
    emit('broadcast message', data, broadcast=True)

@socketio.on('connect')
def handle_connect():
    global connected_users
    connected_users += 1
    emit('user count update', {'count': connected_users}, broadcast=True)

@socketio.on('disconnect')
def handle_disconnect():
    global connected_users
    connected_users -= 1
    emit('user count update', {'count': connected_users}, broadcast=True)

@socketio.on('try_cry')
def handle_try_cry():
    emit('cry', {'emojis': '😭😭😭😭😭😭😭😭😭'}, broadcast=True)

if __name__ == '__main__':
    ip_address = "127.0.0.1:5001"
    print(f'Server starting at IP: {ip_address}')
    socketio.run(app, host='0.0.0.0',port=5001, debug=True)