(function() {
    define([
        'features/login/controller/LoginController',
        'features/login/router/Routes'
    ], function(LoginController, Routes) {

            var moduleName = 'login';

            var module = angular.module(moduleName, []);

            module.controller('LoginController', LoginController);

            return {
                name: moduleName,
                routes: Routes
            };

        });
}());