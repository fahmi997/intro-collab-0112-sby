/**
 * 1. Use arrow fuction
 * 2. Use const variable for fuction
 * 3. Function return data only
 * 4. Use camelCase for fucntion name
 */

import data from './data.json' assert {type: 'json'}

// Feature#1: Add data
// const addData = (_type, _nominal, _note, _date) => {
const addData = (type, nominal, note, date) => {
    let id = data.tracker.length + 1;
    nominal = parseInt(nominal);
    // let isdeleted = false;
    // ------------
    // let type = _type.toString();
    // let note = _note.toString();
    // let date = _date.toString();
    // ------------
    // let type = _type;
    // let note = _note;
    // let date = _date;
    // ------------
    // convert nominal dan id
    // data.tracker.push({id, _type, nominal, _note, _date, isdeleted});
    data.tracker.push({id, type, nominal, note, date});

    // let sendData = JSON.stringify(data.tracker, null, 2);
    // fs.writeFileSync("data.json", sendData);
    return "Success adding data";
}

// Feature#2: Show data based on date
const showDatabyDate = (params) =>{
    let no = 1, result = "";
    let {start, end} = params
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
// const updateData = (index, nominal, note, date) => {
const updateData = (index, params) => {
    // ! input user untuk memilih data melalui index, bukan ID
    // edit = nominal, note, date
    const {field, value} = params
    data.tracker[index - 1][field] = Number(value) == value ? parseInt(value) : value;
    // data.tracker[index - 1].nominal = ! nominal ? data.tracker[index - 1].nominal : nominal;
    // data.tracker[index - 1].note = note;
    // data.tracker[index - 1].date = date;
    // ! write to JSON
    // let sendData = JSON.stringify(data.tracker, null, 2);
    // fs.writeFileSync("data.json", sendData);
    // ! ----
    return "Success update data";
}

// Feature#4: Delete data
const deleteData = (inputUser) => {
    // ! syntax: _data["tracker"]["index"]["key"]
    let index = inputUser-1;

    // //isdeleted ganti nilai ke "true"
    // data.tracker[index]["isDeleted"] = true;
    
    // tampung isi ke var "temp"
    let temp = data.tracker[index];
    
    // HAPUS. splice dari "tracker"
    data.tracker.splice(index, 1);
    
    // PINDAH KE ArrObj BARU. "temp" push ke "deletedData"
    data.deleteData.push(temp);

    // write to
    // let sendData = JSON.stringify(data, null, 2);
    // fs.writeFileSync("data.json", sendData);
    return "Success delete data";
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
            // ! format function addData = (_data, property, _type, _nominal, _note, _date) => {}
            let type = prompt("Masukkan tipe Tracker: income/expense");
            let nominal = parseInt(prompt("Masukkan tipe nominal")); // parse int
            let note = prompt("Masukkan catatan sumber income/expense");
            let date = prompt("Masukkan tanggal income/expense. Dengan format YYYY-MM-DD");
            // panggil fungsi
            // addData(_type, _nominal, _note, _date);
            addData(type, nominal, note, date);
            break;
          case "2":
            // ! "(index - 1)" command already on function, on feature.js
            let field = "";
            let update = prompt(`Pilih data yang akan diganti :\n ${showData()}`)
            
            if(update <= data.tracker.length){
                let updtData = prompt("Menu :\n 1. Nominal\n 2. Note\n 3. Date\n");
                if(updtData === "1" ) {field = "nominal"}
                else if(updtData === "2" ) {field = "note"}
                else if(updtData === "3" ) {field = "date"}
                else alert("Menu tidak tersedia!");
            }
            else { alert("Data tidak tersedia!"); }

            let value = prompt("Masukkan data");
            updateData(update, {field, value});

            loop = confirm("Apakah mau lanjut?");
            
            // let nominal2 = parseInt(prompt("Masukkan tipe nominal baru")); // parse int
            // let note2 = prompt("Masukkan catatan sumber income/expense baru");
            // let date2 = prompt("Masukkan tanggal income/expense baru. Dengan format YYYY-MM-DD");
            break;
          case "3":
            // ! format function deleteData = (_data, inputUser) => {}
            // ! "(index - 1)" command already on function, on feature.js
            var index3 = parseInt(prompt("Masukkan nomor dari data yang ingin dihapus")); // parse int
            // panggil fungsi
            deleteData(index3);
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