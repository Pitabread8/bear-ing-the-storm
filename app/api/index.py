from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/test', methods=['GET'])
def hello_world():
    return "Hello, World!"

@app.route('/api/save', methods=['POST'])
def save_data():
    data = request.get_json()
    return jsonify({'status': 'ok', 'data': data})

if __name__ == '__main__':
    app.run(port=5328)