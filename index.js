const fs = require('fs');
const { addData } = require('./feature');
const data = fs.readFileSync('./data.json', { encoding: 'utf8', flag: 'r' })

const obj = JSON.parse(data);
// console.log(typeof data);
// console.log(typeof obj);
// console.log(obj);

console.log(addData(obj, null, "income", 150000, "gaji", "2023-09-30"));