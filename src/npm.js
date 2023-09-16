const which = require('which')
const print = require('../utils/print')
const {success,warn,fail,notice} = print

function findNpm() {
    let npms = process.platform === 'win32' ? ['npm.cmd'] : ['npm']
    for (let i = 0; i < npms.length; i++) {
      try {
        which.sync(npms[i])
        console.log('use npm: ' + npms[i])
        return npms[i]
      } catch (e) {
      }
    }
    throw new Error('please install npm')
}

const runCmd=(cmd,args,cb)=>{
    args= args||[];
    const runner = require('child_process').spawn(cmd,args,{
        stdio:'inherit'
    })
    runner.on('close',function(code){
        if(cb){
            cb(code)
        }
    })
}
module.exports = function(installArg = ['install']){
    const npm = findNpm();
    return function(done){
        runCmd(which.sync(npm),installArg,function(){
            done && done()
        })
    }
}