const path = require("path");
const webpack=require("webpack");
const htmlWebpackPlugin=require("html-webpack-plugin");
const MiniCssPlugin= require("mini-css-extract-plugin");
const isDev=process.env.NODE_ENV==="production";

module.exports={
	entry:path.join(__dirname,"../src/index.tsx"),
	output:{
		filename:"static/js/[name].[chunkhash:8].js",
		path:path.join(__dirname,"../dist"),
		clean:true,//清除dist文件夹
		publicPath:"/"
	},
	module:{
		rules:[
			{   
				include:[path.resolve(__dirname,"../src")],
				test:/.(ts|tsx)$/,
				use:["thread-loader","babel-loader"],
                
			},
			{
				test: /.(css|less)$/,
				use: [
					isDev ? "style-loader" : MiniCssPlugin.loader,
					{
						loader: "css-loader",
						options: {
							modules: {
								localIdentName: isDev
									? "[local]--[hash:base64:3]"
									: "[path][name]__[local]--[hash:base64:5]",
							},
						},
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: ["autoprefixer"],
							},
						},
					},
					"less-loader",
				],
				generator: {
					filename: "static/css.[name].[chunkhash:8].[ext]",
				},
			},
			{
				test:/.(png|jpg|jpeg|gif|svg)$/,
				type:"asset",
				parser:{
					dataUrlCondition:{
						maxSize:10*1024
					}
				},
				generator:{
					filename:"static/images.[name].[contenthash:8].[ext]"
				}
			},
			{
				test:/.woff2?(eot|ttf|otf)$/,
				type:"asset",
				parser:{
					dataUrlCondition:{
						maxSize:10*1024
					}
				},
				generator:{
					filename:"static/fonts.[name].[contenthash:8].[ext]"
				}
			}
		]
	},
	resolve:{
		extensions:[".js",".ts",".tsx"],
		alias: {
			"@": path.join(__dirname, "../src")
		},
		modules: [path.resolve(__dirname, "../node_modules")]//查找第三方模块只从本项目node_modules中查找
	},
	plugins:[
		new htmlWebpackPlugin({
			template:path.join(__dirname,"../public/index.html")
		}),
		//TODO 注入出现问题
		new webpack.DefinePlugin({
			"process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
		}
		),
		new MiniCssPlugin()
	],
	cache:{
		type:"filesystem" //开启缓存
	}
};