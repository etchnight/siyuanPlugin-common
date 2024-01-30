思源插件公用组件，clone 自[SiYuan plugin sample with vite and svelte](https://github.com/siyuan-note/plugin-sample-vite-svelte)，并在此基础上做了修改

### 开发备忘

- 思源内部 API 位置：`siyuan\\kernel\\api\\router.go`
- 所有 API 必须返回 request 本身，除了错误处理，不对返回值做修改，即必须为`return request("/api/XXX", { args : value })`
