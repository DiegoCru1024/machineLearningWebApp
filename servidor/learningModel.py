from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error


def generarModelo(data):
    parametros = data.drop(['Precio en dólares corrientes'], axis=1)
    variableObjetivo = data['Precio en dólares corrientes']

    modelo = Ridge()
    modelo.fit(parametros, variableObjetivo)
    print("Intercepto del modelo: ", modelo.intercept_)

    prediccion = modelo.predict(parametros)
    print('R^2 = ', modelo.score(parametros, variableObjetivo))
    print('MAE = ', mean_absolute_error(variableObjetivo, prediccion))

    tablaComparacion = parametros
    tablaComparacion['Precio'] = variableObjetivo
    tablaComparacion['PrecioPred'] = prediccion
    tablaComparacion['Diferencia'] = (prediccion / variableObjetivo - 1) * 100
    print(tablaComparacion)

