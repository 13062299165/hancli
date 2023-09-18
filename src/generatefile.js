const fs = require('fs')
const inquirer = require('inquirer')
const print = require("../utils/print")
const path = require('path')

const {fail} = print
/**
 * @param {*} type page|redux|zustand|mobx
 */

const isDirExist=(path)=>{
    return new Promise((resolve)=>{
        fs.stat(path,(err,sta)=>{
            if(err) throw err;
            if(sta.isDirectory()){ 
                resolve()
            }else{
                fail("默认项目根目录下生成文件，应有此路径：" + path)
                throw new Error()
            }
        })
    })   
}

const genPage=()=>{

    let targetPath = process.cwd()+"/src/pages"
    let questions=[{
        name:'pagename',
        message:"请输入页面名称"
    }]

    const copy=(pagename)=>{
        let sourcePath= __dirname.slice(0,-4) + "/gentemplate/page"
        
        fs.readdir(sourcePath,(err,paths)=>{
            if(err)throw err;
            fs.mkdir(`${targetPath}/${pagename}`,(err)=>{
                if(err) throw err;
                paths.forEach(path=>{
                    const curPath=sourcePath+'/'+path;
                    // 结构只有一层，直接复制
                    if(path==="components"){
                        fs.mkdir(`${targetPath}/${pagename}/components`,(err)=>{
                            if(err)throw err;
                        })
                    }
                    else{
                        fs.readFile(curPath,(err,data)=>{
                            if(err)throw err;
                            let content=data.toString();
                            content=content.replace(/Page/g,pagename);
                            console.log(content)
                            fs.writeFile(`${targetPath}/${pagename}/${path}`,Buffer.from(content),(err,data)=>{
                                if(err)throw err;
    
                            })
                        })
                    }
                })
            })
        })
    } 


    isDirExist(targetPath).then(()=>{
        inquirer
            .prompt(questions)
            .then(answer=>{
                let pagename=answer.pagename.trim();
                if(pagename==""){
                    fail("页面名称不能为空")
                }else{
                    copy(pagename)
                }
            })
    })

}

const genStore=()=>{

    const questions=[{
        name:'store',
        message:'请选择你需要生成的状态管理模版文件',
        type:'list',
        choices:['zustand','mobx','redux']
    }]
    const targetPath = process.cwd() + "/src"

    const copy=(store)=>{
        let sourcePath= __dirname.slice(0,-4) + `/gentemplate/${store}.ts`
        const readStream = fs.createReadStream(sourcePath)
        const writeStream = fs.createWriteStream(`${targetPath}/store.ts`);
        readStream.pipe(writeStream);
    }
    isDirExist(targetPath).then(()=>{
        inquirer
            .prompt(questions)
            .then(answer=>{
                copy(answer.store)
            })
    })

}

const gen=(type)=>{

    switch (type){
        case "page": 
            genPage();
            break;
        case "store":
            genStore();
            break;
    }

}
module.exports = gen;