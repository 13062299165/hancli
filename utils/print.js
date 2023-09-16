const chalk = require('chalk')
const typeColor={
    'success':'green',
    'warn':'orange',
    'fail':'red',
    'notice': 'blue'
}

let print={}

for(let type in typeColor){
    const color= typeColor[type]
    print[type]=(text)=>{
        console.log(chalk[color](text))
    }
}

module.exports = print