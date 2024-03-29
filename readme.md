思源插件公用组件，clone 自[SiYuan plugin sample with vite and svelte](https://github.com/siyuan-note/plugin-sample-vite-svelte)，并在此基础上做了修改

## 开发备忘

- 思源内部 API 位置：`siyuan\\kernel\\api\\router.go`
- 所有 API 必须返回 request 本身，除了错误处理，不对返回值做修改，即必须为`return request("/api/XXX", { args : value })`
- 为了简化书写，超过 3 个（含）的入参均写为对象形式，即`data{key : string...}`

### siyuan 全部声明生成(.d.ts)

与 app 有关的所有声明文件在`types`文件夹。
`siyuan-file.d`为与后端(`go`)有关的声明，只能手写。

1. 将`siyuan/app`项目`tsconfig.json`做如下修改
   ```json
   {
     "compilerOptions": {
       "outDir": "./dist/",
       "noImplicitAny": true,
       "module": "commonjs",
       "target": "es6",
       "typeRoots": ["./node_modules/@types"],
       "types": ["node"], //删除"./src/types",
       "declaration": true, //add
       "declarationDir": "types" //add
     }
   }
   ```
2. 运行`tsc --emitDeclarationOnly`
3. 将`app\src\types` 复制到 `app\types`
4. `app\types`即为所有声明
5. 注意将`app/types*`写入`.gitignore`
