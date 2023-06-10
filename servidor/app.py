from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


@app.post('/api')
def return_data():
    data = request.get_json()
    response = {
        'status': 200,
        'message': data['name']
    }

    return jsonify(response)


if __name__ == '__main__':
    app.run()
