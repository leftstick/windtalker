/**
 *  Defines the AuthService
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';

var AuthService = function(utils, DbService) {

    var questions;
    this.questions = function() {
        if (questions) {
            return questions;
        }
        questions = utils.promise(function(resolve, reject) {
            resolve([
                {
                    'label': '父亲的名字',
                    'value': 'FATHER_NAME'
                },
                {
                    'label': '母亲的名字',
                    'value': 'MOTHER_NAME'
                },
                {
                    'label': '配偶的名字',
                    'value': 'SPOUSE_NAME'
                },
                {
                    'label': '小学的名字',
                    'value': 'PRIMARY_SCHOOL_NAME'
                },
                {
                    'label': '第一只宠物的名字',
                    'value': 'FIRST_PET_NAME'
                }
            ]);
        });

        return questions;
    };

    this.getUsers = function() {

        return utils.promise(function(resolve, reject) {

            DbService.getUserDb().find({}, function(err, docs) {
                if (err) {
                    reject('读取用户信息失败');
                    return;
                }
                var users = docs.map(function(doc) {
                    return {
                        id: utils.decryptTxt(doc.id),
                        name: utils.decryptTxt(doc.name),
                        password: utils.decryptTxt(doc.password),
                        question: utils.decryptTxt(doc.question),
                        answer: utils.decryptTxt(doc.answer)
                    };
                });
                resolve(users);
            });
        });
    };

    this.addUser = function(user) {
        var encryptUser = {
            id: utils.encryptTxt(utils.ID()),
            name: utils.encryptTxt(user.name),
            password: utils.encryptTxt(user.password),
            question: utils.encryptTxt(user.question),
            answer: utils.encryptTxt(user.answer)
        };

        return utils.promise(function(resolve, reject) {
            DbService.getUserDb().find({
                name: utils.encryptTxt(user.name)
            }, function(err, docs) {
                if (err) {
                    reject('新增用户信息失败 ' + err);
                    return;
                }
                if (docs.length > 0) {
                    reject('该用户名已被注册，请重试');
                    return;
                }
                DbService.getUserDb()
                    .insert(encryptUser, function(err, doc) {
                        if (err) {
                            reject('新增用户信息失败 ' + err);
                            return;
                        }
                        var u = {
                            id: utils.decryptTxt(doc.id),
                            name: utils.decryptTxt(doc.name),
                            password: utils.decryptTxt(doc.password),
                            question: utils.decryptTxt(doc.question),
                            answer: utils.decryptTxt(doc.answer)
                        };
                        resolve(u);
                    });
            });
        });
    };

    this.updateUser = function(user) {

        var encryptUser = {
            id: utils.encryptTxt(user.id),
            name: utils.encryptTxt(user.name),
            password: utils.encryptTxt(user.password),
            question: utils.encryptTxt(user.question),
            answer: utils.encryptTxt(user.answer)
        };

        return utils.promise(function(resolve, reject) {
            DbService.getUserDb()
                .update({id: encryptUser.id}, encryptUser, {}, function(err) {
                    if (err) {
                        reject('修改用户信息失败 ' + err);
                        return;
                    }
                    resolve(user);
                });
        });
    };

    this.getUserByName = function(name) {

        return utils.promise(function(resolve, reject) {
            DbService.getUserDb()
                .findOne({name: utils.encryptTxt(name)}, function(err, doc) {
                    if (err) {
                        reject('读取用户信息失败');
                        return;
                    }
                    if (!doc) {
                        reject('该用户不存在');
                        return;
                    }
                    var user = {
                        id: utils.decryptTxt(doc.id),
                        name: utils.decryptTxt(doc.name),
                        password: utils.decryptTxt(doc.password),
                        question: utils.decryptTxt(doc.question),
                        answer: utils.decryptTxt(doc.answer)
                    };

                    resolve(user);
                });
        });
    };

    this.getUserById = function(userId) {

        return utils.promise(function(resolve, reject) {
            DbService.getUserDb()
                .findOne({id: utils.encryptTxt(userId)}, function(err, doc) {
                    if (err) {
                        reject('读取用户信息失败');
                        return;
                    }
                    if (!doc) {
                        reject('该用户不存在');
                        return;
                    }
                    var user = {
                        id: utils.decryptTxt(doc.id),
                        name: utils.decryptTxt(doc.name),
                        password: utils.decryptTxt(doc.password),
                        question: utils.decryptTxt(doc.question),
                        answer: utils.decryptTxt(doc.answer)
                    };
                    resolve(user);
                });
        });
    };


};

module.exports = ['utils', 'DbService', AuthService];
