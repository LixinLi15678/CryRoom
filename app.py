from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app)

connected_users = 0

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

if __name__ == '__main__':
    socketio.run(app, debug=True)
    print("http://127.0.0.1:5000/")