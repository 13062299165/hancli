module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node":true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:import/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/self-closing-comp": ["error"],
        "no-console":["waring"],
        "no-empty":["error"],
        "no-eval":["error"],
        "no-unused-vars":["waring"],
        "import/order":[
            "error",
            {
                groups:[
                    "builtin", // 内置模块
                    "external", // 外部模块
                    "parent", //父节点依赖
                    "sibling", //兄弟依赖
                    "internal", //内部引用
                    "index", // index文件
                    "type", //类型文件
                    "unknown",
                ],
                pathGroups:[
                    {
                        pattern:"src/**/*.{less,css}",
                        group:"type",
                        position:"after"
                    }
                ],
                distinctGroup:true,
                "newlines-between": "always",
                alphabetize: { order: "asc" },
            }
        ]
    }
}
