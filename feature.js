/**
 * 1. Use arrow fuction
 * 2. Use const variable for fuction
 * 3. Function return data only
 * 4. Use camelCase for fucntion name
 */

import data from './data.json' assert {type: 'json'}

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
const showDatabyDate = (_params) =>{
    let no = 1, result = "";
    let {start, end} = _params
    let temp = data.tracker.filter((el) => {
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

// Feature#5: Show data: Expense, Income, and remaining money
const showData = () => {
    let no = 1, result = "";
    let remaining = 0;

    for(const i in data.tracker){
        if(data.tracker[i].type === "income") remaining += data.tracker[i].nominal;
        else remaining -= data.tracker[i].nominal;
    }

    data.tracker.sort();

    for(const i in data.tracker){
        result += `${no}. ${data.tracker[i].nominal.toLocaleString("ID",{style: "currency", currency: "IDR"})}, Type : ${data.tracker[i].type}, Note : ${data.tracker[i].note}, Date : ${data.tracker[i].date}`
        i === data.tracker.length - 1 ? result += `` : result += `\n`;
        no++;
    }

    return `Expense tracker :\n${result}\nRemaining Money: ${remaining.toLocaleString("ID",{style: "currency", currency:"IDR"})}`;
};



let loop = true;

      while (loop) {
        let menu = prompt("Menu:\n1. Add data\n2. Edit data\n3. Delete data\n4. Show data by date\n5. Show all data\n0. Exit");

        switch(menu){
          case "1":
            break;
          case "2":
            break;
          case "3":
            break;
          case "4":
            let start = prompt("Enter start date: (YYYY-MM-DD)");
            let end = prompt("Enter end date: (YYYY-MM-DD)");
            alert(`${showDatabyDate({start, end})}`);
            break;
          case "5":
            alert(showData());
            break;
          case "0":
              loop = false;
              break;
          default:
            alert("Menu not available!");
        };
        loop = confirm("Return to menu?");
      };