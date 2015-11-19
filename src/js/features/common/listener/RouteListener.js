/**
 *  Defines the RouteListener Module.
 *  This module used to emit events while route changed
 *
 *  @author  Howard.Zuo
 *  @date    Nov 19, 2015
 *
 */
import FeatureBase from 'lib/FeatureBase';
var mainWindow = nativeRequire('electron').remote.getCurrentWindow();

class Feature extends FeatureBase {

    constructor() {
        super('RouteListenerModule');
    }

    execute() {
        this.run([
            '$rootScope',
            function($rootScope) {
                $rootScope.$on('$routeChangeSuccess', function(e, route) {
                    if (route && route.$$route && route.$$route.size) {
                        mainWindow.setContentSize(route.$$route.size.width, route.$$route.size.height);
                    }
                });

            }
        ]);
    }
}

export default Feature;
