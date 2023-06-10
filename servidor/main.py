from flask import Flask, jsonify
from flask_cors import CORS
import dataManagement, learningModel

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

datosProcesados = dataManagement.inicializarData()
modelo = learningModel.generarModelo(datosProcesados)
data = {
    'Superficie ': [200],
    'Número de habitaciones': [3],
    'Número de baños': [2],
    'Número de garajes': [1],
    'Piso de ubicación': [5],
    'Vista al exterior': [1],
    'Años de antigüedad': [10],
    'ate vitarte': [False],
    'barranco': [True],
    'bellavista': [False],
    'breña': [False],
    'carabayllo': [False],
    'cercado de lima': [False],
    'chorrillos': [False],
    'comas': [False],
    'jesús maría': [False],
    'la molina': [False],
    'la perla': [False],
    'la victoria': [False],
    'lince': [False],
    'los olivos': [False],
    'magdalena': [False],
    'miraflores': [False],
    'pueblo libre': [False],
    'san borja': [False],
    'san isidro': [False],
    'san miguel': [False],
    'surco': [False],
    'surquillo': [False]
}
print("Valor predecido: ", learningModel.predecirPrecio(data, modelo))


@app.get("/api")
def api():
    return jsonify('Hola')


if __name__ == "__main__":
    app.run()
