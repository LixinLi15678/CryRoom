from flask import Flask, render_template, request
from flask_sockets import Sockets
import json

app = Flask(__name__)
sockets = Sockets(app)

@app.route('/')
def index():
    return render_template('index.html')

@sockets.route('/cry_room')
def cry_room_socket(ws):
    while not ws.closed:
        message = ws.receive()
        if message:
            print(f"Received message: {message}")
            # Simulate sending back the updated number of cryers
            ws.send(json.dumps({"cryers_count": "Updated Number"}))

if __name__ == '__main__':
    app.run(debug=True)