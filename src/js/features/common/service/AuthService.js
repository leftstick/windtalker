/**
 *  Defines the Auth Module.
 *  This module used to manage user info
 *
 *  @author  Howard.Zuo
 *  @date    Nov 30, 2015
 *
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');

class Feature extends FeatureBase {

    constructor() {
        super('AuthModule');
    }

    AuthService(utils, DbService) {
        var user;
        this.currentUser = function(info) {
            if (!info) {
                return user;
            }
            user = info;
        };

        var questions;
        this.questions = function() {
            if (questions) {
                return questions;
            }
            questions = utils.resolve([
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
            return questions;
        };

        this.getUsers = function*() {
            if (!DbService.getUserDb()) {
                return utils.reject('您还没有设置数据库，清先设置数据库位置');
            }

            var userDB = DbService.getUserDb();

            var finder = utils.promisify(userDB.find).bind(userDB);

            var docs = yield finder({});
            var users = docs.map(function(doc) {
                return {
                    id: utils.decryptTxt(doc.id),
                    name: utils.decryptTxt(doc.name),
                    password: utils.decryptTxt(doc.password),
                    question: utils.decryptTxt(doc.question),
                    answer: utils.decryptTxt(doc.answer)
                };
            });
            return users;
        };

        this.addUser = function*(user) {
            var encryptUser = {
                id: utils.encryptTxt(utils.ID()),
                name: utils.encryptTxt(user.name),
                password: utils.encryptTxt(user.password),
                question: utils.encryptTxt(user.question),
                answer: utils.encryptTxt(user.answer)
            };

            var userDB = DbService.getUserDb();
            var finder = utils.promisify(userDB.count).bind(userDB);
            var inserter = utils.promisify(userDB.insert).bind(userDB);

            var count = yield finder({
                name: utils.encryptTxt(user.name)
            });
            if (count > 0) {
                return utils.reject('该用户名已被注册，请重试');
            }
            var doc = yield inserter(encryptUser);
            return {
                id: utils.decryptTxt(doc.id),
                name: utils.decryptTxt(doc.name),
                password: utils.decryptTxt(doc.password),
                question: utils.decryptTxt(doc.question),
                answer: utils.decryptTxt(doc.answer)
            };
        };

        this.updateUser = function*(user) {

            var encryptUser = {
                id: utils.encryptTxt(user.id),
                name: utils.encryptTxt(user.name),
                password: utils.encryptTxt(user.password),
                question: utils.encryptTxt(user.question),
                answer: utils.encryptTxt(user.answer)
            };
            var userDB = DbService.getUserDb();
            var updateer = utils.promisify(userDB.update).bind(userDB);
            yield updateer({id: encryptUser.id}, encryptUser, {});
            return user;
        };

        this.getUserByName = function*(name) {

            var userDB = DbService.getUserDb();
            var finder = utils.promisify(userDB.findOne).bind(userDB);
            var doc = yield finder({name: utils.encryptTxt(name)});
            if (!doc) {
                return utils.reject('该用户不存在');
            }
            return {
                id: utils.decryptTxt(doc.id),
                name: utils.decryptTxt(doc.name),
                password: utils.decryptTxt(doc.password),
                question: utils.decryptTxt(doc.question),
                answer: utils.decryptTxt(doc.answer)
            };
        };

        this.getUserById = function*(userId) {
            var userDB = DbService.getUserDb();
            var finder = utils.promisify(userDB.findOne).bind(userDB);

            var doc = yield finder({id: utils.encryptTxt(userId)});

            if (!doc) {
                return utils.reject('该用户不存在');
            }
            return {
                id: utils.decryptTxt(doc.id),
                name: utils.decryptTxt(doc.name),
                password: utils.decryptTxt(doc.password),
                question: utils.decryptTxt(doc.question),
                answer: utils.decryptTxt(doc.answer)
            };
        };
    }

    execute() {
        this.AuthService.$inject = ['utils', 'DbService'];
        this.service('AuthService', this.AuthService);
    }
}

module.exports = Feature;
