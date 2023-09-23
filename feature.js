/**
 * 1. Use arrow fuction
 * 2. Use const variable for fuction
 * 3. Function return data only
 * 4. Use camelCase for fucntion name
 */

// Feature#1: Add data
const addData = (_data, property, _type, _nominal, _note, _date) => {
    // cari id tertinggi
    // id dimulai dari 1, id = index+1
    let id = _data["tracker"].length;
    let nominal = parseInt(_nominal);
    let isdeleted = false;
    // convert nominal dan id
    // protect feature tambahan, ntar
    _data["tracker"].push({id, _type, nominal, _note, _date, isdeleted});
    // console.log(data.tracker);
    // console.log(id);
    // console.log(data.tracker.length);
    let sendData = JSON.stringify(_data, null, 2);
    fs.writeFileSync("data.json", sendData);
    return _data;
}

// Feature#2: Show data based on date

// Feature#3: Update data

// Feature#4: Delete data

// Feature#5: Show data: Expense, Income, and left money

