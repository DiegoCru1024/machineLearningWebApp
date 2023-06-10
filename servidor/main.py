from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.post("/api")
def api():
    return jsonify('Hola')


if __name__ == "__main__":
    app.run()
