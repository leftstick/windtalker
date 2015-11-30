/**
 *  Defines the ManagerService
 *
 *  @author  Howard.Zuo
 *  @date    Nov 26, 2015
 *
 */
'use strict';

var ManagerService = function(utils, DbService) {

    this.getInfos = function*(userId) {

        var secretDB = DbService.getSecretDb();
        var cursor = secretDB.find({
            userId: utils.encryptTxt(userId)
        }).sort({updateDate: -1});
        var finder = utils.promisify(cursor.exec).bind(cursor);
        var docs = yield finder();

        return docs.map(function(doc) {
            var info = {
                id: utils.decryptTxt(doc.id),
                userId: utils.decryptTxt(doc.userId),
                name: utils.decryptTxt(doc.name),
                desc: utils.decryptTxt(doc.desc),
                createDate: doc.createDate,
                updateDate: doc.updateDate,
                items: doc.items.map(function(item) {
                    return {
                        key: utils.decryptTxt(item.key),
                        value: utils.decryptTxt(item.value)
                    };
                })
            };
            return info;
        });
    };

    this.addInfo = function(info) {

        return utils.promise(function(resolve, reject) {
            var encryptInfo = {
                id: utils.encryptTxt(utils.ID()),
                userId: utils.encryptTxt(info.userId),
                name: utils.encryptTxt(info.name),
                desc: utils.encryptTxt(info.desc),
                createDate: new Date().getTime(),
                updateDate: new Date().getTime(),
                items: info.items.map(function(item) {
                    return {
                        key: utils.encryptTxt(item.key),
                        value: utils.encryptTxt(item.value)
                    };
                })
            };

            DbService
                .getSecretDb()
                .count({
                    userId: encryptInfo.userId,
                    name: encryptInfo.name
                })
                .exec(function(err, count) {
                    if (err) {
                        reject('新增秘密信息失败 ' + err);
                        return;
                    }
                    if (count > 0) {
                        reject('该秘密信息已被注册，请重试');
                        return;
                    }

                    DbService
                        .getSecretDb()
                        .insert(encryptInfo, function(err, doc) {
                            if (err) {
                                reject('新增秘密信息失败 ' + err);
                                return;
                            }
                            var i = {
                                id: utils.decryptTxt(doc.id),
                                userId: utils.decryptTxt(doc.userId),
                                name: utils.decryptTxt(doc.name),
                                desc: utils.decryptTxt(doc.desc),
                                createDate: doc.createDate,
                                updateDate: doc.updateDate,
                                items: doc.items.map(function(item) {
                                    return {
                                        key: utils.decryptTxt(item.key),
                                        value: utils.decryptTxt(item.value)
                                    };
                                })
                            };
                            resolve(i);
                        });

                });
        });
    };

    this.updateInfo = function(info) {

        return utils.promise(function(resolve, reject) {
            var id = utils.encryptTxt(info.id);

            var encryptInfo = {
                userId: utils.encryptTxt(info.userId),
                name: utils.encryptTxt(info.name),
                desc: utils.encryptTxt(info.desc),
                createDate: info.createDate,
                updateDate: new Date().getTime(),
                items: info.items.map(function(item) {
                    return {
                        key: utils.encryptTxt(item.key),
                        value: utils.encryptTxt(item.value)
                    };
                })
            };

            DbService
                .getSecretDb()
                .findOne({id: id}, function(err, doc) {
                    if (err) {
                        reject('获取秘密信息失败 ' + err);
                        return;
                    }
                    if (!doc) {
                        reject('秘密信息不存在，或许已被删除，请检查');
                        return;
                    }

                    DbService
                        .getSecretDb()
                        .update({id: id}, {$set: encryptInfo}, {}, function(err) {
                            if (err) {
                                reject('修改秘密信息失败 ' + err);
                                return;
                            }
                            resolve(info);
                        });
                });
        });
    };

    this.removeInfo = function(info) {

        return utils.promise(function(resolve, reject) {
            var id = utils.encryptTxt(info.id);

            DbService
                .getSecretDb()
                .remove({id: id}, {}, function(err) {
                    if (err) {
                        reject('删除秘密信息失败 ' + err);
                        return;
                    }
                    resolve();
                });
        });
    };
};

module.exports = ['utils', 'DbService', ManagerService];
