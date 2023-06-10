import pandas as pd


def inicializarData():
    # Cargamos los datos
    mainCSV = 'https://raw.githubusercontent.com/DiegoCru1024/dataSets/main/precio-inmobiliario-dataset.csv'
    csvCols = ['Año', 'Trimestre', 'Precio en dólares corrientes', 'Distrito', 'Superficie ', 'Número de habitaciones',
               'Número de baños', 'Número de garajes', 'Piso de ubicación', 'Vista al exterior', 'Años de antigüedad']
    initialTable = pd.read_csv(mainCSV)

    # Eliminamos valores nulos y columnas que no usaremos
    filteredTable = initialTable.dropna()
    filteredTable = filteredTable.drop(csvCols[0], axis=1)
    filteredTable = filteredTable.drop(csvCols[1], axis=1)
    filteredTable = filteredTable.drop(csvCols[3], axis=1)
    filteredTable = filteredTable[filteredTable[csvCols[5]] != '#N/D']
    filteredTable = filteredTable[filteredTable[csvCols[6]] != '#N/D']
    filteredTable = filteredTable[filteredTable[csvCols[7]] != '#N/D']
    filteredTable = filteredTable[filteredTable[csvCols[10]] != '#N/D']

    # Eliminamos la coma en el precio
    filteredTable[csvCols[2]] = filteredTable[csvCols[2]].str.replace(",", "")

    # Convertimos las columnas en float
    filteredTable[csvCols[2]] = filteredTable[csvCols[2]].astype(float)
    filteredTable[csvCols[4]] = filteredTable[csvCols[4]].astype(float)
    filteredTable[csvCols[5]] = filteredTable[csvCols[5]].astype(float)
    filteredTable[csvCols[6]] = filteredTable[csvCols[6]].astype(float)
    filteredTable[csvCols[7]] = filteredTable[csvCols[7]].astype(float)
    filteredTable[csvCols[8]] = filteredTable[csvCols[8]].astype(float)
    filteredTable[csvCols[9]] = filteredTable[csvCols[9]].astype(float)
    filteredTable[csvCols[10]] = filteredTable[csvCols[10]].astype(float)

    # Mostramos los valores únicos
    for header in filteredTable.columns:
        print("Valores únicos de " + header)
        print(filteredTable[header].unique())
        print("")

    # Mostramos la tabla filtrada
    print(filteredTable)

    return filteredTable
