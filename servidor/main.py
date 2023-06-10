from flask import Flask, jsonify
from flask_cors import CORS
import dataManagement, learningModel

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

datosProcesados = dataManagement.inicializarData()
modelo = learningModel.generarModelo(datosProcesados)


@app.post("/api")
def api():
    return jsonify('Hola')


if __name__ == "__main__":
    app.run()
