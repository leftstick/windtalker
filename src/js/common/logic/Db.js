/**
 *
 *  Defines Db service
 *
 *  @author  Howard.Zuo
 *  @date    Feb 9th, 2015
 *
 */
(function(define) {
    'use strict';

    define(['angular', 'lodash'], function(angular, _) {

        var Datastore = require('nedb');
        var path = require('path');

        var modulename = 'DbWrapper';

        var USERS_DB_NAME = 'users.db';
        var SECRETS_DB_NAME = 'secrets.db';

        var module = angular.module(modulename, []);

        var definition = function(utils) {

            var userDb, secretDb;

            this.init = function(basePath) {
                var userDbPath = path.join(basePath, USERS_DB_NAME);
                var secretDbPath = path.join(basePath, SECRETS_DB_NAME);
                userDb = new Datastore({
                    filename: userDbPath,
                    autoload: true
                });
                secretDb = new Datastore({
                    filename: secretDbPath,
                    autoload: true
                });
            };

            this.getUsers = function() {

                var defer = utils.handyDefer();
                userDb.find({}, function(err, docs) {
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

                userDb.find({
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
                    userDb.insert(encryptUser, function(err, doc) {
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

        module.service('Db', ['utils', definition]);

        return {
            name: modulename
        };

    });

}(define));
