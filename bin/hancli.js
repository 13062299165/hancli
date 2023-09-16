#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();
const print  = require("../utils/print");
const create = require("../src/createhandler")

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

program.parse()


let opts = program.opts()
if(opts.debug){
	success()
	
}