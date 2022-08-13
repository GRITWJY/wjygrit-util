console.log();
process.on('exit', () => {
  console.log();
});

if (!process.argv[2]) {
  console.error('[组件名]必填 - Please enter new component name');
  process.exit(1);
}

const path = require('path');
const fs = require('fs');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');

// 组件名
const ComponentName = uppercamelcase(process.argv[2]); // 驼峰式
// 组件存放路径
const PackagePath = path.resolve(__dirname, '../../packages');

// 添加到 components.json
const componentsFile = require('../../components.json');
if (componentsFile[ComponentName]) {
  console.error(`${ComponentName} 已存在.`);
  process.exit(1);
}
// 添加到 components.json中
componentsFile[ComponentName] = `${ComponentName}.js`;
// 写入文件
fileSave(path.join(__dirname, '../../components.json'))
  .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
  .end('\n');

// 创建 package
// 这里主要是加入
let content = `export default function ${ComponentName} () {}`;
fileSave(path.join(PackagePath, `${ComponentName}.js`))
  .write(content, 'utf8')
  .end('\n');

console.log('DONE!');
