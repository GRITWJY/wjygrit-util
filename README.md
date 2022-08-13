# wjygrit-util 前端工具函数库


此工具函数库中所有的函数是 从 `d3/lodash/jquery/自研` 等中搜集中等偏下的，
易手写的、实用性高的函数

## V1.1.1

添加自动化新增函数, 和自动化导出打包

**自动化新增函数:** 

`node build/bin/new.js debounce`

之后会在 `packages` 目录下新建一个 `DeBounce.js` 文件

**自动化打包**

`npm run build` 或者 `npm run build-entry` 
可以不用手动在`index.js`里导入, 在 `DeBounce.js` 里写完后直接执行以上一种一个命令, 即可实现自动导入


## V1.0.0
测试npm包是否正常使用


## 函数列表
- JS深克隆
- debounce防抖

