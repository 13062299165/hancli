
import axios,{AxiosRequestConfig,AxiosResponse,AxiosError,AxiosInstance} from 'axios'
import ErrorHandler from './error'
import {message} from 'antd'

const createAxiosInstance=(config?:AxiosRequestConfig):AxiosInstance=>{
    const instance=axios.create({
        timeout:2000,
        withCredentials:true,
        ...config
    })
    instance.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8';

    instance.interceptors.request.use((config)=>{
        if(localStorage.getItem('token')){
            config.headers.Authorization = localStorage.getItem('token');
        }
        return config;
      }, function (error) {
        return Promise.reject(error);
      });

    instance.interceptors.response.use((response:AxiosResponse)=>{
        if(response.status === 200){
            if(response.data.token)localStorage.setItem('token',response.data.token)
            return response.data
        }else{
            return Promise.reject(response)
        }
    },
    (err:AxiosError)=>{
        if(err.response){
            ErrorHandler(err.code , err.message)
            return Promise.reject(err.response)
        }else{
            if(!window.navigator.onLine) message.error("网络中断，请检查网络连接")
            else Promise.reject(err)
        }
    })
    return instance
}
export default createAxiosInstance;