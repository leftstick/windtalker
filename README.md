# 保密局 ![](http://img.shields.io/badge/version-v1.0.2-green.svg) #
===============

在信息极速膨胀的时代，我们都面临着大量的敏感信息，如：密码等。因为众所周知的一些云存储泄漏丑闻，相信大家都不会放心把自己的众多银行卡密码保存在一个Online的“云”里，随时有可能被盗哦！
有时候，只有自己的电脑，好像才是你最心安的所在。  
`保密局`就是这样一个工具，她将你的“机密”仅仅保存在你指定的位置，当然可以是本地磁盘、移动硬盘、U盘也可以是网络硬盘。  
经过`保密局`存储到文件数据库的信息都是经过OpenSSL加密的，确保不会被人为破解，所以可以放心使用。

![](./docs/imgs/login.png)  ![](./docs/imgs/signup.png)
![](./docs/imgs/forget.png) ![](./docs/imgs/secret.png)
![](./docs/imgs/create.png) ![](./docs/imgs/setting.png)

## Downloads ##

* **v1.0.2** (2015-03-04)

 * Windows: [64bit](https://github.com/leftstick/windtalker/releases/download/1.0.2/windtalker-v1.0.2-win-x64.tar.gz)
 * Mac 10.7+: [64bit](https://github.com/leftstick/windtalker/releases/download/1.0.2/windtalker-v1.0.2-darwin-x64.tar.gz)


## 本地编译 ##

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