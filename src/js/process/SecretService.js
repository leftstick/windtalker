'use strict';
var ipcMain = require('electron').ipcMain;

var Datastore = require('nedb');
var path = require('path');
var crypto = require('crypto')

var SECRETS_DB_NAME = 'secrets.db';
var secretDb, algorithm, password;

var encryptTxt = function(text) {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

var decryptTxt = function(text) {
    var decipher = crypto.createDecipher(algorithm, password);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

var SecretService = function(app, mainWindow) {
    ipcMain.on('db-address', function(e, opts) {
        algorithm = opts.algorithm;
        password = opts.password;
        var secretDbPath = path.join(opts.address, SECRETS_DB_NAME);
        secretDb = new Datastore({
            filename: secretDbPath,
            autoload: true
        });
    });

    ipcMain.on('get-secrets', function(event, userId) {
        if (!secretDb) {
            process.nextTick(function() {
                event.sender.send('get-secrets-reply', {
                    error: '数据库未设置'
                });
            });
            return;
        }
        secretDb
            .find({userId: encryptTxt(userId)})
            .sort({updateDate: -1})
            .exec(function(err, docs) {
                if (err) {
                    event.sender.send('get-secrets-reply', {
                        error: '读取秘密信息失败'
                    });
                    return;
                }

                var infos = docs.map(function(doc) {
                    var info = {
                        id: decryptTxt(doc.id),
                        userId: decryptTxt(doc.userId),
                        name: decryptTxt(doc.name),
                        desc: decryptTxt(doc.desc),
                        createDate: doc.createDate,
                        updateDate: doc.updateDate,
                        items: doc.items.map(function(item) {
                            return {
                                key: decryptTxt(item.key),
                                value: decryptTxt(item.value)
                            };
                        })
                    };
                    return info;
                });

                event.sender.send('get-secrets-reply', {
                    data: infos
                });
            });

    });

};

module.exports = SecretService;
