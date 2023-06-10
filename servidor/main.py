from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import dataManagement, learningModel

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

datosProcesados = dataManagement.inicializarData()
modelo = learningModel.generarModelo(datosProcesados)


@app.post("/api/predictPrice")
def predictPrice():
    requestData = request.json

    data = [{
        'Superficie ': requestData.get('Superficie'),
        'Número de habitaciones': requestData.get('Número de habitaciones'),
        'Número de baños': requestData.get('Número de baños'),
        'Número de garajes': requestData.get('Número de garajes'),
        'Piso de ubicación': requestData.get('Piso de ubicación'),
        'Vista al exterior': requestData.get('Vista al exterior'),
        'Años de antigüedad': requestData.get('Años de antigüedad'),
        'ate vitarte': requestData.get('ate vitarte'),
        'barranco': requestData.get('barranco'),
        'bellavista': requestData.get('bellavista'),
        'breña': requestData.get('breña'),
        'carabayllo': requestData.get('carabayllo'),
        'cercado de lima': requestData.get('cercado de lima'),
        'chorrillos': requestData.get('chorrillos'),
        'comas': requestData.get('comas'),
        'jesús maría': requestData.get('jesús maría'),
        'la molina': requestData.get('la molina'),
        'la perla': requestData.get('la perla'),
        'la victoria': requestData.get('la victoria'),
        'lince': requestData.get('lince'),
        'los olivos': requestData.get('los olivos'),
        'magdalena': requestData.get('magdalena'),
        'miraflores': requestData.get('miraflores'),
        'pueblo libre': requestData.get('pueblo libre'),
        'san borja': requestData.get('san borja'),
        'san isidro': requestData.get('san isidro'),
        'san miguel': requestData.get('san miguel'),
        'surco': requestData.get('surco'),
        'surquillo': requestData.get('surquillo')
    }]

    table = pd.DataFrame(data)
    print(table)

    prediccion = modelo.predict(table)

    return jsonify(prediccion.tolist())


if __name__ == "__main__":
    app.run()
