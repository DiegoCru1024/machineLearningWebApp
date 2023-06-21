import requests
import pymongo
import json

# Establecer conexión con MongoDB
client = pymongo.MongoClient(
    "mongodb+srv://admin:djNoTUbLHNpoo211@maincluster.a2r5y5z.mongodb.net/?retryWrites=true&w=majority")

# Seleccionar la base de datos y la colección
db = client["gameStationDB"]
collection = db["appIDs"]


def llamar_api(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Comprueba si hay errores en la respuesta

        # La respuesta de la API suele estar en formato JSON
        api_response = response.json()
        return api_response
    except requests.exceptions.RequestException as e:
        print("Error al llamar a la API:", e)
        return None


apiResponse = llamar_api('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json')
data = apiResponse
app_list = data["applist"]["apps"]

for app in app_list:
    appid = app["appid"]
    document = {"appid": appid}
    collection.insert_one(document)