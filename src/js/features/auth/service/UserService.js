/**
 *
 *  The UserService.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 11th, 2015
 *
 **/
(function(define) {
    'use strict';

    define(['lodash'], function(_) {

        var UserService = function(Db, utils) {

            this.getUsers = function() {

                var defer = utils.handyDefer();
                Db.getUserDb().find({}, function(err, docs) {
                    if (err) {
                        defer.reject({
                            data: '读取用户信息失败'
                        });
                        return;
                    }

                    var users = _.map(docs, function(doc) {
                        return {
                            id: utils.decryptTxt(doc.id),
                            name: utils.decryptTxt(doc.name),
                            password: utils.decryptTxt(doc.password),
                            question: utils.decryptTxt(doc.question),
                            answer: utils.decryptTxt(doc.answer)
                        };
                    });
                    defer.resolve({
                        data: users
                    });
                });

                return defer.promise;
            };

            this.addUser = function(user) {
                var defer = utils.handyDefer();
                var encryptUser = {
                    id: utils.encryptTxt(utils.ID()),
                    name: utils.encryptTxt(user.name),
                    password: utils.encryptTxt(user.password),
                    question: utils.encryptTxt(user.question),
                    answer: utils.encryptTxt(user.answer)
                };

                Db.getUserDb().find({
                    name: utils.encryptTxt(user.name)
                }, function(err, docs) {
                    if (err) {
                        defer.reject({
                            data: '新增用户信息失败 ' + err
                        });
                        return;
                    }
                    if (docs.length > 0) {
                        defer.reject({
                            data: '该用户名已被注册，请重试'
                        });
                        return;
                    }
                    Db.getUserDb().insert(encryptUser, function(err, doc) {
                        if (err) {
                            defer.reject({
                                data: '新增用户信息失败 ' + err
                            });
                            return;
                        }
                        var u = {
                            id: utils.decryptTxt(doc.id),
                            name: utils.decryptTxt(doc.name),
                            password: utils.decryptTxt(doc.password),
                            question: utils.decryptTxt(doc.question),
                            answer: utils.decryptTxt(doc.answer)
                        };
                        defer.resolve({
                            data: u
                        });
                    });

                });

                return defer.promise;
            };

        };

        return ['Db', 'utils', UserService];

    });


})(define);
