import {message} from 'antd'

function ErrorHandler(code:string,message = undefined){
    const networkErr: { [propName: string]: any;} = {
        "400":{
            message:"请求错误"
        },
        '401':{
            message:"登陆状态信息过期，请重新登录",
            handler:()=>{
                localStorage.removeItem("token")
            }
        },
        '403':{
            message:"服务器拒绝执行操作"
        },
        '404':{
            message:"资源请求失败"
        },
        '405':{
            message:"请求方法未允许"
        },
        '500':{
            message:"服务器发生错误"
        },
        '501':{
            message:"服务器繁忙，请稍后再试"
        },
        "503": {
            message:"服务不可用"
        },
        "504": {
            message:"网络超时"
        },
    }
    if(networkErr.hasOwnProperty(code)){
        message.error(networkErr[code].message)
        networkErr[code].handler&& networkErr[code].handler()
    }else if(code=="0"){
        message.error(message??"请求发生错误")
    }else{
        message.error("无法连接到服务器");
    }
}

export default ErrorHandler