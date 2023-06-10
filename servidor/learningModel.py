import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score


def generarModelo(data):
    parametros = data.drop(['Precio en dólares corrientes'], axis=1)
    variableObjetivo = data['Precio en dólares corrientes']
    X_train, X_test, y_train, y_test = train_test_split(parametros, variableObjetivo, test_size=0.2, random_state=42)

    # Crear el modelo de Random Forest para regresión
    random_forest = RandomForestRegressor(n_estimators=200, max_depth=15, min_samples_split=5)

    # Entrenar el modelo
    random_forest.fit(X_train, y_train)

    # Realizar predicciones en el conjunto de prueba
    predicciones = random_forest.predict(X_test)

    # Calcular el coeficiente R2
    r2 = r2_score(y_test, predicciones)

    # Imprimir el coeficiente R2
    print("Coeficiente R2: ", r2)
    return random_forest


def predecirPrecio(datos, modelo):
    table = pd.DataFrame(datos)
    prediccion = modelo.predict(table)
    return prediccion
