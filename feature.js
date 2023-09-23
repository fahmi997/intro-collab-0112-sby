/**
 * 1. Use arrow fuction
 * 2. Use const variable for fuction
 * 3. Function return data only
 * 4. Use camelCase for fucntion name
 */

const fs = require("fs");



// Feature#1: Add data
const addData = (data, property, _type, _nominal, _note, _date) => {
    // cari id tertinggi
    // id dimulai dari 1, id = index+1
    let id = data["tracker"].length;
    let nominal = parseInt(_nominal);
    let isdeleted = false;
    // convert nominal dan id
    // protect feature tambahan, ntar
    data["tracker"].push({id, _type, nominal, _note, _date, isdeleted});
    // console.log(data.tracker);
    // console.log(id);
    // console.log(data.tracker.length);
    let sendData = JSON.stringify(data, null, 2);
    fs.writeFileSync("data.json", sendData);
    return data;
}

// Feature#2: Show data based on date

// Feature#3: Update data
const updateData = (data, inputUser) => {

}

// Feature#4: Delete data
const deleteData = (data, inputUser) => {
    
    // ! data["tracker"]["index"]["key"]
    
    let index = inputUser-1;

    //isdeleted ganti nilai ke "true"
    data["tracker"][index]["isDeleted"] = true;

    // tampung isi ke var "temp"
    let temp = data["tracker"][index];

    // HAPUS. splice dari "tracker"
    data["tracker"][index].splice(index, 1);

    // PINDAH KE ArrObj BARU. "temp" push ke "deletedData"
    data["deletedData"].push(temp);
};

// Feature#5: Show data: Expense, Income, and left money



module.exports = {
    addData,
    updateData,
    deleteData,
};