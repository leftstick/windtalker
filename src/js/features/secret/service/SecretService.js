/**
 *
 *  The SecretService.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 11th, 2015
 *
 **/
(function(define) {
    'use strict';

    define(['lodash'], function(_) {

        var SecretService = function(Db, utils) {

            this.getInfos = function(userId) {

                var defer = utils.handyDefer();

                Db.getSecretDb().find({
                    userId: utils.encryptTxt(userId)
                }, function(err, docs) {
                    if (err) {
                        defer.reject({
                            data: '读取秘密信息失败'
                        });
                        return;
                    }

                    var infos = _.map(docs, function(doc) {

                        var info = {
                            id: utils.decryptTxt(doc.id),
                            userId: utils.decryptTxt(doc.userId),
                            name: utils.decryptTxt(doc.name),
                            desc: utils.decryptTxt(doc.desc),
                            items: _.map(doc.items, function(item) {
                                return {
                                    key: utils.decryptTxt(item.key),
                                    value: utils.decryptTxt(item.value)
                                };
                            })
                        };

                        return info;
                    });

                    defer.resolve({
                        data: infos
                    });
                });

                return defer.promise;
            };

            this.addInfo = function(info) {

                var defer = utils.handyDefer();

                var encryptInfo = {
                    id: utils.encryptTxt(utils.ID()),
                    userId: utils.encryptTxt(info.userId),
                    name: utils.encryptTxt(info.name),
                    desc: utils.encryptTxt(info.desc),
                    items: _.map(info.items, function(item) {
                        return {
                            key: utils.encryptTxt(item.key),
                            value: utils.encryptTxt(item.value)
                        };
                    })
                };

                Db.getSecretDb().find({
                    name: utils.encryptTxt(info.name)
                }, function(err, docs) {
                    if (err) {
                        defer.reject({
                            data: '新增秘密信息失败 ' + err
                        });
                        return;
                    }
                    if (docs.length > 0) {
                        defer.reject({
                            data: '该秘密信息已被注册，请重试'
                        });
                        return;
                    }
                    Db.getSecretDb().insert(encryptInfo, function(err, doc) {
                        if (err) {
                            defer.reject({
                                data: '新增秘密信息失败 ' + err
                            });
                            return;
                        }
                        var i = {
                            id: utils.decryptTxt(doc.id),
                            userId: utils.decryptTxt(doc.userId),
                            name: utils.decryptTxt(doc.name),
                            desc: utils.decryptTxt(doc.desc),
                            items: _.map(doc.items, function(item) {
                                return {
                                    key: utils.decryptTxt(item.key),
                                    value: utils.decryptTxt(item.value)
                                };
                            })
                        };
                        defer.resolve({
                            data: i
                        });
                    });

                });

                return defer.promise;
            };

            this.updateInfo = function(info) {
                var defer = utils.handyDefer();

                var id = utils.encryptTxt(info.id);

                var encryptInfo = {
                    userId: utils.encryptTxt(info.userId),
                    name: utils.encryptTxt(info.name),
                    desc: utils.encryptTxt(info.desc),
                    items: _.map(info.items, function(item) {
                        return {
                            key: utils.encryptTxt(item.key),
                            value: utils.encryptTxt(item.value)
                        };
                    })
                };

                Db.getSecretDb().findOne({
                    id: id
                }, function(err, doc) {
                    if (err) {
                        defer.reject({
                            data: '获取秘密信息失败 ' + err
                        });
                        return;
                    }
                    if (!doc) {
                        defer.reject({
                            data: '秘密信息不存在，或许已被删除，请检查'
                        });
                        return;
                    }

                    Db.getSecretDb().update({
                        id: id
                    }, {
                        $set: encryptInfo
                    }, {}, function(err) {
                        if (err) {
                            defer.reject({
                                data: '修改秘密信息失败 ' + err
                            });
                            return;
                        }
                        defer.resolve({
                            data: info
                        });
                    });

                });

                return defer.promise;
            };

            this.removeInfo = function(info) {
                var defer = utils.handyDefer();

                var id = utils.encryptTxt(info.id);

                Db.getSecretDb().remove({
                    id: id
                }, {}, function(err) {
                    if (err) {
                        defer.reject({
                            data: '删除秘密信息失败 ' + err
                        });
                        return;
                    }
                    defer.resolve({});
                });
                return defer.promise;
            };

        };

        return ['Db', 'utils', SecretService];

    });


})(define);
