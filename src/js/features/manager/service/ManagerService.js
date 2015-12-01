/**
 *  Defines the ManagerService
 *
 *  @author  Howard.Zuo
 *  @date    Dec 1, 2015
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

    this.addInfo = function*(info) {

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

        var secretDB = DbService.getSecretDb();
        var cursor = secretDB.count({
            userId: encryptInfo.userId,
            name: encryptInfo.name
        });
        var finder = utils.promisify(cursor.exec).bind(cursor);
        var inserter = utils.promisify(secretDB.insert).bind(secretDB);
        var count = yield finder();
        if (count > 0) {
            return utils.reject('该秘密信息已被注册，请重试');
        }

        var doc = yield inserter(encryptInfo);
        return {
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
    };

    this.updateInfo = function*(info) {

        var id = utils.encryptTxt(info.id);
        var secretDB = DbService.getSecretDb();
        var findOner = utils.promisify(secretDB.findOne).bind(secretDB);
        var updater = utils.promisify(secretDB.update).bind(secretDB);

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

        var doc = yield findOner({id: id});
        if (!doc) {
            return utils.reject('秘密信息不存在，或许已被删除，请检查');
        }
        var numReplaced = yield updater({id: id}, {$set: encryptInfo}, {});
        return info;
    };

    this.removeInfo = function*(info) {
        var secretDB = DbService.getSecretDb();
        var deleter = utils.promisify(secretDB.remove).bind(secretDB);
        var id = utils.encryptTxt(info.id);
        return deleter({id: id}, {});
    };
};

module.exports = ['utils', 'DbService', ManagerService];
