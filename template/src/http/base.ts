const node_env  = process.env.NODE_ENV
const url={
    "production":"",
    "development":""
}
export default url[node_env]