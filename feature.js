/**
 * 1. Use arrow fuction
 * 2. Use const variable for fuction
 * 3. Function return data only
 * 4. Use camelCase for fucntion name
 */

const fs = require("fs");



// Feature#1: Add data
const addData = (_data, property, _type, _nominal, _note, _date) => {
    // cari id tertinggi
    // id dimulai dari 1, id = index+1
    let id = _data["tracker"].length + 1;
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
const showDatabyDate = (_data, _params) =>{
    let no = 1, result = "";
    let {prop, start, end} = _params
    let temp = _data[prop].filter((el) => {
        let dataDate = new Date(el.date);
        let startDate = new Date(start);
        let endDate = new Date(end);
        if( dataDate >= startDate && dataDate <= endDate){
            return el
        } 
    });

    for(const i in temp){
        result += `${no}. ${temp[i].nominal.toLocaleString("ID",{style: "currency", currency: "IDR"})}, Type : ${temp[i].type}, Note : ${temp[i].note}, Date : ${temp[i].date}`
        i === temp.length - 1 ? result += `` : result += `\n`;
        no++;
    }

    return `Expense tracker on ${start} - ${end}:\n${result}`;
};

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
const showData = (_data) => {
    let no = 1, result = "";
    let remaining = 0;

    for(const i in _data){
        console.log(_data[i].type);
        if(_data[i].type === "income") remaining += _data[i].nominal;
        else remaining -= _data[i].nominal;
    }

    _data.sort();

    for(const i in _data){
        result += `${no}. ${_data[i].nominal.toLocaleString("ID",{style: "currency", currency: "IDR"})}, Type : ${_data[i].type}, Note : ${_data[i].note}, Date : ${_data[i].date}`
        i === _data.length - 1 ? result += `` : result += `\n`;
        no++;
    }

    return `Expense tracker :\n${result}\nRemaining Money: ${remaining.toLocaleString("ID",{style: "currency", currency:"IDR"})}`;
};


module.exports = {
    addData,
    updateData,
    deleteData,
    showDatabyDate,
    showData
};