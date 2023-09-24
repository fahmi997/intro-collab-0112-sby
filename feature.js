/**
 * 1. Use arrow fuction
 * 2. Use const variable for fuction
 * 3. Function return data only
 * 4. Use camelCase for fucntion name
 */

import data from './data.json' assert {type: 'json'}

// Feature#1: Add data
const addData = (type, nominal, note, date) => {
    let id = data.tracker.length + 1;
    nominal = parseInt(nominal);
 
    data.tracker.push({id, type, nominal, note, date});

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
const updateData = (index, params) => {
    const {field, value} = params
    data.tracker[index - 1][field] = Number(value) == value ? parseInt(value) : value;
    
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

const showDatabyCategory = (params) => {
  let no = 1, result = "";

  const temp = data.tracker.filter((el) => el.type === params)

  for(const i in temp){
    result += `${no}. ${temp[i].nominal.toLocaleString("ID",{style: "currency", currency: "IDR"})}, Type : ${temp[i].type}, Note : ${temp[i].note}, Date : ${temp[i].date}`;
    i === temp.length - 1 ? result += `` : result += `\n`;
    no++;
  };

  return `Expense tracker :\n${result}`;
};


let loop = true;

      while (loop) {
        let menu = prompt("Menu:\n1. Add data\n2. Edit data\n3. Delete data\n4. Show data by date\n5. Show data by category\n6. Show all data\n0. Exit");

        switch(menu){
          case "1":
            let type = prompt("Masukkan tipe Tracker: income/expense");
            let nominal = parseInt(prompt("Masukkan tipe nominal"));
            let note = prompt("Masukkan catatan sumber income/expense");
            let date = prompt("Masukkan tanggal income/expense. Dengan format YYYY-MM-DD");
            // panggil fungsi
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
            let param = prompt("Select category:\n1. Income\n2. Expense");
            let category;
            if(param === "1") category = "income";
            else if(param === "2") category = "expense";
            else "Category not found!";
            alert(showDatabyCategory(category));
            break;
          case "6":
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