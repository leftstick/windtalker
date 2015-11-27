# 保密局 ![](http://img.shields.io/badge/version-v2.0.0-green.svg) #
===============

在信息极速膨胀的时代，我们都面临着大量的敏感信息，最重要的莫过于自己各种网站、卡的账号和密码了。因为众所周知的一些云存储泄漏丑闻，以及人类本能的自我保护意识，相信大家都不会放心把自己的众多银行卡密码保存在一个Online的“云”里，随时有可能被盗哦！

`保密局`就是这样一个工具，她将你的“秘密”加密后以文件形式存储在你指定的位置(可以是本地磁盘、移动硬盘、U盘，当然也可以是网络硬盘)。因为本质上，`保密局`仅仅提供一了一个"秘密"信息的聚合管理功能，至于机密存在哪里，由你决定。你甚至可以把“机密”文件拷贝在U盘里随身携带。

新版`保密局`基于[electron](http://electron.atom.io/)开发，提供了一些简单常用的管理功能，例如：“秘密”太多时，可以帮你快速查找到自己“去哪儿”网的账号密码。但“秘密”信息，完全由自我管理，不与任何网络环境发生交互。且“秘密”信息都经由OpenSSL加密，且加密混淆`password`仅我本人在生成安装包时指定。也就是说，只要你的“秘密”文件不会意外的发给我，那么被破解的可能性会低到没朋友。

![](./docs/imgs/example.gif)

## 下载 ##

* **v2.0.0** (2015-11-27)

 * Windows: [64bit](https://github.com/leftstick/windtalker/releases/download/2.0.0/windtalker-v2.0.0-win-x64.tar.gz)
 * Mac 10.11+: [64bit](https://github.com/leftstick/windtalker/releases/download/2.0.0/windtalker-v2.0.0-darwin-x64.tar.gz)


## 想要贡献代码？ ##

看这里：[开发文档](./docs/start-guide.md)

 ## LICENSE ##

 [MIT License](https://raw.githubusercontent.com/leftstick/windtalker/master/LICENSE)
