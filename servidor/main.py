from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/api")
def api():
    return jsonify('Hola')


if __name__ == "__main__":
    app.run()
