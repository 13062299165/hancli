import {lazy} from "react";
const Page=lazy(()=>import("."))
const routes=[
    {
        name : "用例页面",
        component : Page,
        path:'/page'
    }
]
export default routes;