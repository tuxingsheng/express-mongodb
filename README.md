> 这是一个基础的，综合了webpack，es6，express，mongodb的实例。
```

## 初始化使用方法
```
git clone https://github.com/tuxingsheng/express-mongodb.git
npm install nodemon -g
npm install
npm run dev         开启静态调试模式
npm run server      开启node调试模式
npm run build       webpack打包
npm run pro         webpack打包，并使用node开启正式上线模式
npm run app         使用node开启正式上线模式
```

## nodemon 配置文件参数
    restartable: 重启的命令，默认是 rs，可以改成你自己喜欢的字符串
    ignore: 忽略的文件后缀名或者文件夹，文件路径的书写用相对于 nodemon.json 所在位置的相对路径
    verbose: true 表示输出详细启动与重启信息，false 表示不输出这些运行信息
    execMap: 运行服务的后缀名和对应的运行命令，"js": "node --harmony" 表示用 nodemon 代替 node --harmony 运行 js 后缀文件；"" 指 www 这些没有后缀名的文件；默认的 defaults.js 配置文件会识别一些文件：py: 'python',rb: 'ruby'
    events: 这个字段表示 nodemon 运行到某些状态时的一些触发事件，总共有五个状态
        • start - 子进程（即监控的应用）启动
        • crash - 子进程崩溃，不会触发 exit
        • exit - 子进程完全退出，不是非正常的崩溃
        • restart - 子进程重启
        • config:update - nodemon 的 config 文件改变
    watch: 监控的文件夹路径或者文件路径
    env: 运行环境 development 是开发环境，production 是生产环境。port 是端口号
    ext: 监控指定后缀名的文件，用空格间隔。默认监控的后缀文
    legacy-watch: nodemon 使用  Chokidar 作为底层监控系统，但是如果监控失效，或者提示没有需要监控的文件时，就需要使用轮询模式（polling mode），即设置 legacy-watch 为 true，也可以在命令行中指定 nodemon --legacy-watch
    runOnChangeOnly: true 时运行 nodemon www 项目不会启动，只保持对文件的监控，当监控的文件有修改并保存时才会启动应用，其他没有影响。默认是 false 即一开始就启动应用并监控文件改动
    colous: 输出信息颜色标示
