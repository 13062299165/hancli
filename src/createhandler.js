const inquirer = require("inquirer")
const print  = require("../utils/print");
const fs = require('fs');
const path = require("path");
const {success,warn,fail,notice} = print
const npm = require("./npm")
const questions = [
    {
        name : 'conf',
        type : 'confirm',
        message : '是否创建新项目'
    },
    {
        name : "name",
        message : "请输入项目名称",
        when : res => Boolean(res.conf)
    },
    {
        name : "author",
        message : "请输入作者",
        when : res => Boolean(res.conf)
    },
    // {
    //     name : "",
    //     type:"list",
    //     message : "选择本次项目要用的管理状态工具",
    //     choice:['mobx','zustand'],
    //     filter:val => val.toLowerCase(),
    //     when : res => Boolean(res.conf)
    // },
]

function copyFiles(answer){
     //写入package.json
     const revisePackageJson = (answer,templateSource)=>{
        return new Promise((resolve,reject)=>{
            const packagePath= templateSource+"/package.json"
            fs.readFile(packagePath,(err,data)=>{
                if(err) throw Error("文件读取失败\n"+err)
                let json = JSON.parse(data.toString());
               for(let key in answer){
                    if(key!=="conf"){
                        json[key]=answer[key]
                    }
               }
               const path = process.cwd()+'/package.json';
               //输出格式需要换行
               let stringJson = JSON.stringify(json,null,"\t")
               fs.writeFile(path,Buffer.from(stringJson),()=>{
                    success("创建配置文件成功");
                    resolve()
               })
            })
        })
     }

     let fileCount = 0;
     let dirCount = 0;
     let flat = 0;
     let isInstall = false;
     const copyDir=(sourcePath , currentPath , cb)=>{
        flat++;
        fs.readdir(sourcePath,(err,paths)=>{
            flat--;
            if(err) throw err;
            paths.forEach(path => {
                const newSourcePath = `${sourcePath}/${path}`
                const newCurrentPath = `${currentPath}/${path}`
                if(path!=='package.json' && path!=='.git' && path!=='node_modules') fileCount++;

                fs.stat(newSourcePath,(err,sta)=>{
                    if(err) throw err;
                    if(sta.isFile()  && path!=='package.json' && path!=='.git'){
                        const readStream = fs.createReadStream(newSourcePath)
                        const writeStream = fs.createWriteStream(newCurrentPath)
                        readStream.pipe(writeStream);
                        fileCount--;
                        completeCopy(cb)
                    }
                    else if(sta.isDirectory() && path!="node_modules"){
                        dirCount++;
                        fs.mkdir(newCurrentPath,(err,data)=>{
                            if(err){
                                throw new Error("存在文件冲突，为保证您的数据不被覆盖，请在空文件夹下运行")
                            }
                            dirCount--;
                            fileCount--;
                            copyDir(newSourcePath,newCurrentPath,cb)
                            completeCopy(cb)
                        })

                    }
                })

            });
        })
     }

     const completeCopy=(cb)=>{
        console.log(fileCount,dirCount,flat)
        if(fileCount === 0 && dirCount===0 && flat === 0){
            success("---构建完成--")
            if(cb && !isInstall){
                isInstall = true;
                notice("--开始安装--")
                cb(()=>{
                    success("--完成安装---")
                })
            }
        }
     }

     success("------开始构建--------")
     const templateSource = __dirname.slice(0,-3) + "template";
     revisePackageJson(answer,templateSource).then(()=>{
         copyDir(templateSource,process.cwd(),npm());
     })
    
}



function create(){
    inquirer
        .prompt(questions)
        .then(answer=>{
            if(answer.conf){
                console.log(answer)
                copyFiles(answer)
            }
        })
}

module.exports = create;