import Page from "@/pages/Page/router";

interface IRoutesItem{
    name:string,
    component:any,
    path:string,
}

const routes:IRoutesItem[] = [
    ...Page
]

export default routes;