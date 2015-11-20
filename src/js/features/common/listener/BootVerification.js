/**
 *
 *  Defines BootVerification
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');

var DB_ADDRESS_KEY = 'windtaler.dbaddress';

class Feature extends FeatureBase {

    constructor() {
        super('BootVerificationModule');
    }

    execute() {
        this.run([
            'StorageService',
            '$location',
            'DbService',
            function(StorageService, $location, DbService) {
                var address = StorageService.get(DB_ADDRESS_KEY);
                if (!address) {
                    $location.url('setdb');
                    return;
                }
                DbService.init(address);
            }
        ]);
    }
}

module.exports = Feature;
