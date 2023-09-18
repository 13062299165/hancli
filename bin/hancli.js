#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();
const print  = require("../utils/print");
const create = require("../src/createhandler")
const gen = require("../src/generatefile")

const {success,warn,fail,notice} = print
// info
program
	.name('privatecli')
	.description('CLI for EMS')
	.version('0.0.1');

program
	.option('-d,--debug')

// command
program
	.command('create')
	.description('create project')
	.action(function(){
		success("-----------开始运行项目------------")
		try{
			create()
		}catch(err){
			fail(err)
			fail("---项目创建失败---")
		}
	})

program
	.command("gen")
	.description("generate file")
	.argument('<type>',"需要生成的项目模版")
	.action(function(type){
		try{
			if(type!=="page" && type!="store"){
				fail("生成文件类型目前仅支持：")
				fail("页面：page")
				fail("状态管理：store")
			}
			else{
				gen(type)
			}
		}catch(err){
			fail(err)
			fail("文件创建失败")
		}
	})

program.parse()


let opts = program.opts()
if(opts.debug){
	success()
	
}