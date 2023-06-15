import pandas as pd
import data.dataManagement as dataManagement
import learningModel.modelGeneration as modelGeneration

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

datosProcesados = dataManagement.inicializarData()
modelo = modelGeneration.generateModel(datosProcesados)


@app.post("/api/predictPrice")
def predictPrice():
    requestData = request.json

    if -1 in requestData.values():
        return jsonify(message="Ingrese todos los datos antes de continuar..."), 405

    data = [{
        'Distrito': requestData.get('distrito'),
        'Superficie ': requestData.get('superficie'),
        'Número de habitaciones': requestData.get('habitaciones'),
        'Número de baños': requestData.get('banos'),
        'Número de garajes': requestData.get('garajes'),
        'Piso de ubicación': requestData.get('piso'),
        'Vista al exterior': requestData.get('vista_exterior'),
        'Años de antigüedad': requestData.get('antiguedad'),
    }]

    table = pd.DataFrame(data)
    prediccion = modelo.predict(table)
    fixedPrediccion = round(prediccion[0], 2)

    prediccionDF = pd.DataFrame(prediccion)
    resultTable = pd.concat([table, prediccionDF], axis=1)
    print(resultTable)

    return jsonify(fixedPrediccion)


if __name__ == "__main__":
    app.run()
