from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'predictive-model')))
from model_prediction import main

app = Flask(__name__)
CORS(app)

@app.route('/api/test', methods=['GET'])
def hello_world():
    return "Hello, World!"

@app.route('/api/save', methods=['POST'])
def save_data():
    data = request.get_json()
    results = main(data["lat"], data["lng"], data["date"])
    # return jsonify({'status': 'ok', 'data': data})
    return jsonify(results)

if __name__ == '__main__':
    app.run(port=5328)