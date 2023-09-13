const isDev=process.env.NODE_ENV === "development";
module.exports={
	"presets":[
		[
			"@babel/preset-env",
			{
				"useBuiltIns": "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
				"corejs": 3, // 配置使用core-js低版本
			}
		],
		"@babel/preset-react",
		"@babel/preset-typescript"
	],
	"plugins":[
		isDev&&require.resolve("react-refresh/babel")
	].filter(Boolean)//当isDev为false时将布尔值过滤
};