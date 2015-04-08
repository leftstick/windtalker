# 保密局 ![](http://img.shields.io/badge/version-v1.2.4-green.svg) #
===============

在信息极速膨胀的时代，我们都面临着大量的敏感信息，最重要的莫过于自己各种网站、卡的账号和密码了。因为众所周知的一些云存储泄漏丑闻，以及人类本能的自我保护意识，相信大家都不会放心把自己的众多银行卡密码保存在一个Online的“云”里，随时有可能被盗哦！

`保密局`就是这样一个工具，她将你的“机密”加密后以文件形式存储在你指定的位置(可以是本地磁盘、移动硬盘、U盘，当然也可以是网络硬盘)。因为本质上，`保密局`仅仅提供一了一个"机密"信息的聚合管理功能，至于机密存在哪里，由你决定。你甚至可以把“机密”文件拷贝在U盘里随身携带。

`保密局`是一款基于[nw.js](https://github.com/nwjs/nw.js)开发的桌面应用，提供了一些简单常用的管理功能，例如：“机密”太多时，可以帮你快速查找到自己“去哪儿”网的账号密码。但“机密”信息，完全由自我管理，不与任何网络环境发生交互。且“机密”信息都经由OpenSSL加密，且加密混淆`password`仅我本人在生成安装包时指定。也就是说，如果你的“机密”文件不会意外的发给我，那么被破解的可能性会降到最低。

![](./docs/imgs/example.gif)

## 下载 ##

* **v1.2.4** (2015-03-09)

 * Windows: [64bit](https://github.com/leftstick/windtalker/releases/download/1.2.4/windtalker-v1.2.4-win-x64.tar.gz)
 * Mac 10.7+: [64bit](https://github.com/leftstick/windtalker/releases/download/1.2.4/windtalker-v1.2.4-darwin-x64.tar.gz)


## 本地源码编译 ##

### 本地编译环境需求 ###

* [NodeJs](http://nodejs.org)


### 编译 ###

#### Mac ####

1. `sudo npm install gulp -g`
2. `sudo npm install bower -g`
3. `git clone git@github.com:leftstick/windtalker.git`
4. `cd windtalker`
5. `sudo npm install`
6. `gulp` - dev build
7. `gulp --prod -p abcdKsi97` - release build


#### Windows ####

1. `npm install gulp -g`
2. `npm install bower -g`
3. `git clone git@github.com:leftstick/windtalker.git`
4. `cd windtalker`
5. `npm install`
6. `gulp` - dev build
7. `gulp --prod -p abcdKsi97` - release build

> `Release build` 必须指定`-p`参数，详情参考[password](http://nodejs.org/api/crypto.html#crypto_crypto_createcipher_algorithm_password)

> 编译后的可执行文件在`build/windtalker／<OS>/`下，双击`windtalker.app`或者`windtalker.exe`即可打开