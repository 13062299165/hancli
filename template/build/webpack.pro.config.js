const baseConfig=require("./webpack.base.config");
const {merge} =require("webpack-merge");
const CopyWebpackPlugin=require("copy-webpack-plugin"); 
const cssMinimizerPlugin=require("css-minimizer-webpack-plugin");
const terserPlugin=require("terser-webpack-plugin");
const globAll = require("glob-all");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const path= require("path");
module.exports = merge(baseConfig,{
	mode:"production",
	plugins:[
		new CopyWebpackPlugin({
			from:path.resolve(__dirname,"../public"),
			to:path.resolve(__dirname,"../dist"),
			filter:source=>!source.includes("index.html")
		})
	],
	optimization:{
		minimizer:[
			new cssMinimizerPlugin(),
			new terserPlugin({
				parallel:true,//多线程压缩
				terserOptions:{
					compress:{
						pure_funcs:["console.log"]
					}
				}
			}),
			new PurgeCSSPlugin({
				paths: globAll.sync([
					`${path.join(__dirname, "../src")}/**/*.tsx`,
					path.join(__dirname, "../public/index.html")
				])
			})
		]
        
	}
});