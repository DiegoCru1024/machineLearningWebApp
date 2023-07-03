import pandas as pd
import uuid
import json
from bson import json_util
from pymongo import MongoClient

import data.dataManagement as dataManagement
import learningModel.modelGeneration as modelGeneration

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

datosProcesados, datosMostrados = dataManagement.inicializarData()
modelo = modelGeneration.generateModel(datosProcesados)

# Conectamos a la base de datos
url = 'mongodb+srv://admin:djNoTUbLHNpoo211@maincluster.a2r5y5z.mongodb.net/?retryWrites=true&w=majority'
client = MongoClient(url)
db = client['RealEstate']
coleccion = db['departments']


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


@app.post('/api/publishItem')
def publishItem():
    itemData = request.json
    titulo = itemData['titulo']
    descripcion = itemData['descripcion']
    precio = itemData['precio']
    imagen = itemData['imagen']

    if imagen is None:
        return jsonify(message="Seleccione una imagen..."), 400

    if precio < 0:
        return jsonify(message="Ingrese un precio correcto..."), 400

    if descripcion == 'Descripción' or len(descripcion) < 100:
        return jsonify(message="Ingrese una descripción de al menos 100 caracteres..."), 400

    # Verificar si ya existe un objeto con el mismo título
    existing_item = coleccion.find_one({'titulo': titulo})
    if existing_item:
        return jsonify(message="El título ya está registrado..."), 400

    # Generar un UUID y almacenarlo en el objeto
    item_uuid = str(uuid.uuid4())
    itemData['uuid'] = item_uuid

    # Si no existe, guardar el nuevo objeto
    itemID = coleccion.insert_one(itemData).inserted_id
    print(itemID)
    return jsonify(message="Registrado correctamente"), 200


@app.get('/api/getItems')
def getItems():
    items = list(coleccion.find({}, {'_id': 0}))
    return jsonify(items)


@app.get('/api/getInfo')
def getInfo():
    uuidQuery = request.args.get('uuid')

    itemInfo = coleccion.find_one({'uuid': uuidQuery})

    # Excluir el campo _id del objeto itemInfo
    itemInfo.pop('_id', None)

    # Convertir el objeto itemInfo a JSON y devolverlo
    return json.loads(json_util.dumps(itemInfo))


@app.get('/api/getDataFrame/')
def getDataFrame():
    page = int(request.args.get('pageNumber'))
    query = request.args.get('queryString')
    ascending = request.args.get('ascending') == 'true'

    page_size = 20  # Número de filas por página
    start_index = (page - 1) * page_size
    end_index = start_index + page_size

    if query != '' and query in datosMostrados.columns:
        datosMostrados_sorted = datosMostrados.sort_values(by=query, ascending=not ascending)
        data_page = datosMostrados_sorted.iloc[start_index:end_index].to_json(orient='records')
    else:
        data_page = datosMostrados.iloc[start_index:end_index].to_json(orient='records')

    return jsonify(data_page)


if __name__ == "__main__":
    app.run()
