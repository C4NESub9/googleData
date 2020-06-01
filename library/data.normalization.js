async function requestFile1(url) {
    try {
        let [data] = await Promise.all([
            fetch(url).then(response => response.text().then(text => text))
        ]);
        return data;
    }
    catch (err) {
        console.log(err);
    };
}

async function requestFile2(url1, url2) {
    try {
        let [data1, data2] = await Promise.all([
            fetch(url1).then(response => response.text().then(text => text)),
            fetch(url2).then(response => response.text().then(text => text)),
        ]);
        var responses = [data1, data2];
        return responses;
    }
    catch (err) {
        console.log(err);
    };
}

async function requestData1(url) {
    try {
        let [data] = await Promise.all([
            fetch(url).then(response => response.text().then(text => text))
        ]);
        var array = csvToArray(data);
        return array;
    }
    catch (err) {
        console.log(err);
    };
}

async function requestData2(url1, url2) {
    try {
        let [data1, data2] = await Promise.all([
            fetch(url1).then(response => response.text().then(text => text)),
            fetch(url2).then(response => response.text().then(text => text)),
        ]);
        var responses = [data1, data2];
        var arrays = responses.map(x => csvToArray(x));
        return arrays;
    }
    catch (err) {
        console.log(err);
    };
}

async function requestData4(serie1, serie2, serie3, serie4) {
    try {
        let [data_serie1, data_serie2, data_serie3, data_serie4] = await Promise.all([
            fetch(serie1).then(response => response.text().then(text => text)),
            fetch(serie2).then(response => response.text().then(text => text)),
            fetch(serie3).then(response => response.text().then(text => text)),
            fetch(serie4).then(response => response.text().then(text => text))
        ]);

        var responses = [data_serie1, data_serie2, data_serie3, data_serie4];
        var arrays = responses.map(x => csvToArray(x));
        var contents = arrays.map(x => removeHeaders(x));
        var data = contents.map(x => typifyData(x));
        return data;
    }
    catch (err) {
        console.log(err);
    };
}

async function requestData9(serie1, serie2, serie3, serie4, serie5, serie6, serie7, serie8, serie9) {
    try {
        let [data_serie1, data_serie2, data_serie3, data_serie4, data_serie5, data_serie6, data_serie7, data_serie8, data_serie9] = await Promise.all([
            fetch(serie1).then(response => response.text().then(text => text)),
            fetch(serie2).then(response => response.text().then(text => text)),
            fetch(serie3).then(response => response.text().then(text => text)),
            fetch(serie4).then(response => response.text().then(text => text)),
            fetch(serie5).then(response => response.text().then(text => text)),
            fetch(serie6).then(response => response.text().then(text => text)),
            fetch(serie7).then(response => response.text().then(text => text)),
            fetch(serie8).then(response => response.text().then(text => text)),
            fetch(serie9).then(response => response.text().then(text => text))
        ]);

        var responses = [data_serie1, data_serie2, data_serie3, data_serie4, data_serie5, data_serie6, data_serie7, data_serie8, data_serie9];
        var arrays = responses.map(x => csvToArray(x));
        var contents = arrays.map(x => removeHeaders(x));
        var data = contents.map(x => typifyData(x));
        return data;
    }
    catch (err) {
        console.log(err);
    };
}

function assignInformation4(data, area, list) {
    var result = data.map((value, index) => {
        var serie = { 'area': area, 'variable': list[index], 'data': value }
        return serie;
    });
    return result;
}

function assignInformation9(data, variable, list) {
    var result = data.map((value, index) => {
        var serie = { 'variable': variable, 'area': list[index], 'data': value }
        return serie;
    });
    return result;
}

function mountTableByArea(data, area, variables, start, period) {

    var dateRange = createDateRange(start, period).map((d) => dateToString(d));

    var data_cols = [
        { id: '0', label: 'Data', type: 'string' },
        { id: '1', label: variables[0], type: 'number' },
        { id: '2', label: variables[1], type: 'number' },
        { id: '3', label: variables[2], type: 'number' },
        { id: '4', label: variables[3], type: 'number' }
    ]
    var data_rows = [];
    for (date of dateRange) {
        var x1 = searchSamples(data, date, area, variables[0])
        var x2 = searchSamples(data, date, area, variables[1])
        var x3 = searchSamples(data, date, area, variables[2])
        var x4 = searchSamples(data, date, area, variables[3])

        row = { c: [{ v: date }, { v: x1 }, { v: x2 }, { v: x3 }, { v: x4 }] }
        data_rows.push(row);
    }
    return { cols: data_cols, rows: data_rows }
}

function mountTableByVariable(data, variable, areas, start, period) {

    var dateRange = createDateRange(start, period).map((d) => dateToString(d));

    var data_cols = [
        { id: '0', label: 'Data', type: 'string' },
        { id: '1', label: areas[0], type: 'number' },
        { id: '2', label: areas[1], type: 'number' },
        { id: '3', label: areas[2], type: 'number' },
        { id: '4', label: areas[3], type: 'number' },
        { id: '5', label: areas[4], type: 'number' },
        { id: '6', label: areas[5], type: 'number' },
        { id: '7', label: areas[6], type: 'number' },
        { id: '8', label: areas[7], type: 'number' },
        { id: '9', label: areas[8], type: 'number' }
    ]
    var data_rows = [];
    for (date of dateRange) {
        var x1 = searchSamples(data, date, areas[0], variable)
        var x2 = searchSamples(data, date, areas[1], variable)
        var x3 = searchSamples(data, date, areas[2], variable)
        var x4 = searchSamples(data, date, areas[3], variable)
        var x5 = searchSamples(data, date, areas[4], variable)
        var x6 = searchSamples(data, date, areas[5], variable)
        var x7 = searchSamples(data, date, areas[6], variable)
        var x8 = searchSamples(data, date, areas[7], variable)
        var x9 = searchSamples(data, date, areas[8], variable)

        row = { c: [{ v: date }, { v: x1 }, { v: x2 }, { v: x3 }, { v: x4 }, { v: x5 }, { v: x6 }, { v: x7 }, { v: x8 }, { v: x9 }] }
        data_rows.push(row);
    }
    return { cols: data_cols, rows: data_rows }
}

function extractValueFromCovidRegional(data, region, variable) {

    var variable_index = data[0].indexOf(variable)
    var date_index = data[0].indexOf('date')
    var region_index = data[0].indexOf('region')

    var data_region = data.filter(row => row[region_index] === region)
    if (data_region.length === 0) return 'Not Avaiable'

    var latestDay = extractLatestUpdateFromCovidRegional(data, region)
    var latestRegister = data_region.filter(row => row[date_index] === latestDay)

    return latestRegister[0][variable_index];
}
function extractLatestUpdateFromCovidRegional(data, region) {

    var region_index = data[0].indexOf('region')
    var date_index = data[0].indexOf('date')

    var data_region = data.filter(row => row[region_index] === region)
    var dates = data_region.map(row => convertToDate(row[date_index]))
    var latestDay = new Date(Math.max.apply(null, dates));

    return dateToString(latestDay);
}


function csvToArray(csv) {
    clean0 = csv.replace(/'/g, '');
    clean = clean0.replace(/"/g, '');

    rows = clean.split("\n")
    return rows.map(function (row) {
        return row.split(",");
    });
};

function removeHeaders(list) {
    return list.splice(1);
}

function typifyData(list) {
    var typed = list.map(function (row) {
        for (i = 0; i < row.length; i++) {
            if (i == 1) row[i] = parseFloat(row[i])
        }
        return row;
    });
    return typed;
}

function searchSamples(data, date, state, variable) {
    data_serie = data.filter((serie) => serie.area == state && serie.variable == variable);
    if (data_serie.length == 0) return null;

    data_value = data_serie[0].data.filter((sample) => sample[0] === date)
    if (data_value.length == 0) return null;

    return data_value[0][1]
}

function createDateRange(start, days) {
    var result = [];
    for (i = 0; i < days; i++) {
        day = addDays(start, i);
        result.push(day)
    }
    return result;
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function dateToString(date) {
    const ano = date.getFullYear();
    const mes = (`00${date.getMonth() + 1}`).slice(-2);
    const dia = (`00${date.getDate()}`).slice(-2);
    return `${ano}-${mes}-${dia}`;
}

function defineDate(day, month, year) {
    return new Date(year, month - 1, day);
}

function convertToDate(text) {

    var itens = text.split("-");
    var year = itens[0];
    var month = itens[1] - 1;
    var day = itens[2];

    return new Date(year, month, day);
}

function insertVerticalLineInChart(yValue, data) {
    data.cols.splice(1, 0, { type: 'string', role: 'annotation' })
    data.rows = data.rows.map(row => {
        var mark = undefined
        if (row['c'][0]['v'] === yValue) mark = ''
        row['c'].splice(1, 0, { v: mark })
        return row
    })
}

function dataArrayToJson(data, numberTypeColumns) {

    var headers = data[0]
    var content = data.slice(1)

    var list = content.map((row) => {
        var obj = {}
        for (i = 0; i < headers.length; i++)
            obj[headers[i]] = numberTypeColumns.includes(i) ? Number(row[i]) : row[i]
        return obj
    })
    return list
}

function structureIHME(data) {
    return new IHME(data)
}

class IHME {
    constructor(data) {
        this.hospitalizationData = this.typifyHospitalizationData(data[0])
        this.summaryStatsData = this.typifySummaryStatsData(data[1])
    }

    typifyHospitalizationData(data) {
        var numberColumns = [...Array(data[0].length).keys()]
        numberColumns.splice(1, 2) //Keeping only number columns
        return dataArrayToJson(data, numberColumns)
    }

    typifySummaryStatsData(data) {
        var numberColumns = [...Array(data[0].length).keys()]
        numberColumns.splice(0, 10) //Keeping only number columns
        numberColumns.splice(6, 12) //Keeping only number columns
        return dataArrayToJson(data, numberColumns)
    }

}

// Begin: Functions related to Minsiterio da Saúde data:

function statesList() {
    return ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'];
}
function stateData(data) {

    const states = statesList()
    var result = {};
    for (state of states) {
        result[state] = dataByState(data, state);
    }
    return result;
}

function dataByState(data, state) {
    return data.filter(row => row.estado === state && row.codmun === '')
}

function dataArrayToJson_MS(data) {

    const numberTypeColumns = [8, 9, 10, 11]

    var headers = data[0]
    var content = data.splice(1)

    var list = content.map((row, index) => {
        var obj = {}
        for (i = 0; i < headers.length; i++)
            obj[headers[i]] = numberTypeColumns.includes(i) ? Number(row[i]) : row[i]
        return obj
    })
    return list
}

function calculateStateData(data) {

    const states = statesList()
    var result = {};
    for (state of states) {
        var state_data = data[state]
        result[state] = calculateStateVariables(state_data);
    }
    return result;
}

function calculateStateVariables(data) {

    const minimumCases = 100
    const minimumDeaths = 10
    const populationFactor = 100000
    const movingAverageSamples = 6

    var result1 = data.map((object, index, array) => {
        if (index === 0) {
            object['diasCasosNovos'] = 0
            object['diasObitosNovos'] = 0
            object['incidenciaCasos'] = 0
            object['incidenciaObitos'] = 0
        } else {
            var previous = array[index - 1]
            object['casosNovos'] = object['casosAcumulado'] - previous['casosAcumulado']
            object['obitosNovos'] = object['obitosAcumulado'] - previous['obitosAcumulado']
            object['diasCasosNovos'] = object['casosAcumulado'] < minimumCases ? 0 : previous['diasCasosNovos'] + 1
            object['diasObitosNovos'] = object['obitosAcumulado'] < minimumDeaths ? 0 : previous['diasObitosNovos'] + 1
            object['incidenciaCasos'] = object['diasCasosNovos'] >= 1 ? object['casosNovos'] / object['populacaoTCU2019'] * populationFactor : 0
            object['incidenciaObitos'] = object['diasObitosNovos'] >= 1 ? object['obitosNovos'] / object['populacaoTCU2019'] * populationFactor : 0
        }
        return object
    })

    var result2 = result1.map((object, index, array) => {
        if (index < movingAverageSamples) {
            object['movingAverageCases'] = 0
            object['movingAverageDeaths'] = 0
        } else {
            samples = array.slice(index - movingAverageSamples, index + 1).map(x => x['incidenciaCasos'])
            object['movingAverageCases'] = samples.reduce((previous, current) => previous + current, 0) / samples.length
            samples = array.slice(index - movingAverageSamples, index + 1).map(x => x['incidenciaObitos'])
            object['movingAverageDeaths'] = samples.reduce((previous, current) => previous + current, 0) / samples.length
        }
        return object
    })
    return result2;
}

function alignStates(data, variable) {

    const states = statesList()

    var result = {};
    for (state of states) {
        var state_data = data[state]
        //result[state] = state_data.filter(x => x['diasCasosNovos'] > 0)
        result[state] = state_data.filter(x => x[variable] > 0)
    }
    return result;
}

function mountTable(data, variable) {

    var states = statesList()

    var size = []
    for (state of states)
        size.push(data[state].length)
    max_index = Math.max(...size)

    var data_cols = [
        { id: '0', label: 'Dias após o caso 100', type: 'number' },
        { id: '1', label: states[0], type: 'number' },
        { id: '2', label: states[1], type: 'number' },
        { id: '3', label: states[2], type: 'number' },
        { id: '4', label: states[3], type: 'number' },
        { id: '5', label: states[4], type: 'number' },
        { id: '6', label: states[5], type: 'number' },
        { id: '7', label: states[6], type: 'number' },
        { id: '8', label: states[7], type: 'number' },
        { id: '9', label: states[8], type: 'number' }
    ]
    var data_rows = [];
    for (day = 1; day < max_index; day++) {
        var x1 = emptyValueValidation(data[states[0]], day, variable)
        var x2 = emptyValueValidation(data[states[1]], day, variable)
        var x3 = emptyValueValidation(data[states[2]], day, variable)
        var x4 = emptyValueValidation(data[states[3]], day, variable)
        var x5 = emptyValueValidation(data[states[4]], day, variable)
        var x6 = emptyValueValidation(data[states[5]], day, variable)
        var x7 = emptyValueValidation(data[states[6]], day, variable)
        var x8 = emptyValueValidation(data[states[7]], day, variable)
        var x9 = emptyValueValidation(data[states[8]], day, variable)

        row = { c: [{ v: day }, { v: x1 }, { v: x2 }, { v: x3 }, { v: x4 }, { v: x5 }, { v: x6 }, { v: x7 }, { v: x8 }, { v: x9 }] }
        data_rows.push(row);
    }
    return { cols: data_cols, rows: data_rows }
}

function emptyValueValidation(state_data, index, variable) {
    if (state_data[index] === undefined) 
        return undefined
    else
        return state_data[index][variable]//['movingAverage']
}


// End: Functions related to Minsiterio da Saúde data




