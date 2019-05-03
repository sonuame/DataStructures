let data = require("./excel.json");
let fs = require("fs");

let GetQuantity = (fsn) => {
    let item = data.find(e=>e.FSN === fsn);
    let output = [];
    if(item) {
        Object.keys(item).filter(e=>e!=='FSN' && e !== 'Model Name').forEach(e=>{
            output.push({
                fsn : fsn,
                warehouse : e,
                qty : item[e],
                concat : fsn + ',' + e + ',' + item[e]
            })
        })
    }
    return output;
}

let result = [];

data.forEach(item => {
    result = result.concat(GetQuantity(item.FSN));
})

fs.writeFileSync('excel_output.csv', result.map(e=>e.concat).join('\n'));

console.log('Output Created');