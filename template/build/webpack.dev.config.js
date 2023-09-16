const baseConfig=require("./webpack.base.config");
const {merge} =require("webpack-merge"); 
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path= require("path");
const isDev=process.env.NODE_ENV==="development";
module.exports = merge(baseConfig,{
	mode:"development",
	devtool:"eval-cheap-module-source-map",
	devServer:{
		port:10086,
		compress:false,
		hot:true,
		historyApiFallback:true,
		//热更时不打包静态资源
		static:{
			directory : path.join(__dirname,"../public")
		}
	},
	plugins:[
		new ReactRefreshWebpackPlugin()
	]
});