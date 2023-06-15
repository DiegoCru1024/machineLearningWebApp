import pandas as pd


def inicializarData():
    # Cargamos los datos
    mainCSV = 'https://raw.githubusercontent.com/DiegoCru1024/dataSets/main/precio-inmobiliario-dataset.csv'
    csvCols = ['Año', 'Trimestre', 'Precio en dólares corrientes', 'Distrito', 'Superficie ', 'Número de habitaciones',
               'Número de baños', 'Número de garajes', 'Piso de ubicación', 'Vista al exterior', 'Años de antigüedad']
    initialTable = pd.read_csv(mainCSV)

    # Eliminamos valores nulos y columnas que no usaremos
    filteredTable = initialTable.fillna(0.0)
    filteredTable = filteredTable.drop(csvCols[0], axis=1)
    filteredTable = filteredTable.drop(csvCols[1], axis=1)
    filteredTable = filteredTable[filteredTable[csvCols[5]] != '#N/D']
    filteredTable = filteredTable[filteredTable[csvCols[6]] != '#N/D']
    filteredTable = filteredTable[filteredTable[csvCols[7]] != '#N/D']
    filteredTable = filteredTable[filteredTable[csvCols[10]] != '#N/D']

    # Eliminamos la coma en el precio y normalizamos los valores de Vista al exterior
    filteredTable[csvCols[2]] = filteredTable[csvCols[2]].str.replace(",", "")
    filteredTable[csvCols[9]] = filteredTable[csvCols[9]].replace(11, 1)

    # Convertimos las columnas en float
    filteredTable[csvCols[2]] = filteredTable[csvCols[2]].astype(float)
    filteredTable[csvCols[4]] = filteredTable[csvCols[4]].astype(float)
    filteredTable[csvCols[5]] = filteredTable[csvCols[5]].astype(float)
    filteredTable[csvCols[6]] = filteredTable[csvCols[6]].astype(float)
    filteredTable[csvCols[7]] = filteredTable[csvCols[7]].astype(float)
    filteredTable[csvCols[8]] = filteredTable[csvCols[8]].astype(float)
    filteredTable[csvCols[9]] = filteredTable[csvCols[9]].astype(float)
    filteredTable[csvCols[10]] = filteredTable[csvCols[10]].astype(float)

    # Le damos el formato correcto a la columna de Distrito para poder reemplazar sus valores
    filteredTable[csvCols[3]] = filteredTable[csvCols[3]].str.lower()
    filteredTable[csvCols[3]] = filteredTable[csvCols[3]].str.replace("la perla", "callao")
    filteredTable[csvCols[3]] = filteredTable[csvCols[3]].str.replace("bellavista", "callao")

    # Diccionario utilizado para reemplazar valores
    distritos = {
        'san isidro': 44,
        'miraflores': 43,
        'la molina': 42,
        'barranco': 41,
        'san borja': 40,
        'surco': 39,
        'magdalena': 38,
        'san miguel': 37,
        'jesús maría': 36,
        'pueblo libre': 35,
        'lince': 34,
        'chorrillos': 33,
        'breña': 32,
        'callao': 31,
        'san juan de miraflores': 30,
        'la victoria': 29,
        'rimac': 28,
        'ate vitarte': 27,
        'el agustino': 26,
        'santa anita': 25,
        'villa maría del triunfo': 24,
        'los olivos': 23,
        'comas': 22,
        'independencia': 21,
        'carabayllo': 20,
        'san martín de porres': 19,
        'puente piedra': 18,
        'santa rosa': 17,
        'surquillo': 16,
        'cercado de lima': 15,
        'villa el salvador': 14,
        'san juan de lurigancho': 13,
        'ancón': 12,
        'cieneguilla': 11,
        'santa maría del mar': 10,
        'chaclacayo': 9,
        'pachacamac': 8,
        'punta hermosa': 7,
        'punta negra': 6,
        'pucusana': 5,
        'san bartolo': 4,
        'lurigancho-chosica': 3,
        'san luis': 2,
        'lurín': 1
    }

    # Convertimos los valores de Distrito al nivel promedio designado
    filteredTable[csvCols[3]] = filteredTable[csvCols[3]].replace(distritos)
    filteredTable[csvCols[3]] = filteredTable[csvCols[3]].astype(float)

    # Mostramos los valores únicos
    for header in filteredTable.columns:
        print("Valores únicos de " + header)
        print(filteredTable[header].unique())
        print("")

    print(filteredTable)

    return filteredTable
