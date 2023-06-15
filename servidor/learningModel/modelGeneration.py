from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import r2_score
import joblib, os


def generateModel(data):
    if os.path.exists('./learningModel/random_forest_model.pkl'):
        # Cargar el modelo desde el archivo
        random_forest_model = joblib.load('./learningModel/random_forest_model.pkl')
        print("El modelo ha sido cargado correctamente.")
        return random_forest_model
    else:
        # Dividimos nuestros parámetros y la variable objetivo
        parametros = data.drop(['Precio en dólares corrientes'], axis=1)
        variableObjetivo = data['Precio en dólares corrientes']

        # Dividimos nuestros datos en los conjuntos de entrenamiento y prueba respectivos
        X_train, X_test, y_train, y_test = train_test_split(parametros, variableObjetivo, test_size=0.2,
                                                            random_state=42)

        # Crear el modelo de Bosque Aleatorio para regresión
        random_forest = RandomForestRegressor(n_estimators=200, max_depth=15, min_samples_split=10, random_state=42,
                                              n_jobs=-1)

        # Entrenar el modelo
        random_forest.fit(X_train, y_train)

        # Realizar predicciones en el conjunto de prueba
        predicciones = random_forest.predict(X_test)

        # Calcular el coeficiente R2
        r2 = r2_score(y_test, predicciones)

        # Imprimir el coeficiente R2
        print("Coeficiente R2:", r2)

        # Guardar el modelo en un archivo
        joblib.dump(random_forest, './learningModel/random_forest_model.pkl')

        print("El modelo ha sido generado correctamente.")
        return random_forest
