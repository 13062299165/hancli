import QS from 'qs';
import createAxiosInstance from './utils/instance';
import baseURL from './base';

const instance = createAxiosInstance({baseURL})

const requestQueue=[]

const requestAdmin=(url,params)=>{
    let el={url,params}
    let index=requestQueue.indexOf(el)
    if(index!==-1){
        requestQueue.push(el)
        let timer=setTimeout(()=>{
           requestQueue.splice(index,1)
           clearTimeout(timer) 
        },100)
    }else{
        return true;
    }
}

const http = {
    get<T>(url:string,params:any):Promise<T>|void{
        if(requestAdmin(url,params)){
            return new Promise((resolve,reject)=>{
                instance
                .get(url,{params:params})
                .then(res=>resolve(res.data))
                .then(err=>reject(err))
            })
        }
    },

    post<T>(url:string,params:any):Promise<T>|void{
        if(requestAdmin(url,params)){
            return new Promise((resolve,reject)=>{
                instance
                    .post(url,QS.stringify(params))
                    .then(res=>resolve(res.data))
                    .catch(err=>reject(err))
            })
        }
    },
    put(){

    }
}

export default http;

