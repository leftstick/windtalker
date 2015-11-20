/**
 *  Defines the AuthService
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';

var AuthService = function(utils) {

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
};

module.exports = ['utils', AuthService];
