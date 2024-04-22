from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = '892-027-955'
socketio = SocketIO(app)

connected_users = 0
last_cry_time = 0

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('message')
def handle_message(data):
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
    global last_cry_time
    current_time = time.time()
    if current_time - last_cry_time >= 5:
        last_cry_time = current_time
        emit('cry', {'emojis': '😭😭😭😭😭😭😭😭😭'}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)
    # http://127.0.0.1:5000/