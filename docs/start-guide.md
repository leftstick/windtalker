## 开发需求 ##

1. [node](https://nodejs.org/en/)
2. [gulp](https://github.com/gulpjs/gulp)

> `gulp`需要全局安装(即：`npm install -g gulp`)

## 本地调试 ##

### 安装依赖 ###

```bash
npm install
```

### 启动持续编译 ###

在命令行中输入：

```bash
gulp watch -p <password>
```

> 持续编译的目的是为了在代码修改后，自动编译，无需频繁手动编译，提高开发效率
> `password`即为加密时的私有密钥，之所以在编译时传入就是为了避免他人得知，增加安全性

### 打开本地调试应用 ###

在命令行中输入：

```bash
gulp dev
```

> `gulp dev`之后就打开了应用，如果想开调试工具，只要`ctrl + shift + i`(for windows)，或者`cmd + option + i`(for mac)即可

每次修改万源码后，只要`ctrl + r`(for windows)或者`cmd + r`(for mac)就能刷新界面看到新效果了

## 生成独立应用 ##

在命令行中输入：

```bash
gulp release -p <password>
```

`windows-x64`和`osx-x64`两个平台的应用，会生成在`dist/`目录下
