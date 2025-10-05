from flask import Flask, requests, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/test', methods=['GET'])
def hello_world():
    return "Hello, World!"

@app.route('/api/save', methods=['POST'])
def save_message():
    data = requests.get_json()
    return jsonify({'status': 'ok', 'data': data})

if __name__ == '__main__':
    app.run(port=5328)

if __name__ == '__main__':
    app.run(port=5328)