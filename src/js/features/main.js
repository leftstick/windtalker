/**
 *  Entrance of features
 *
 *  @author  Howard.Zuo
 *  @date    Nov 18, 2015
 *
 */
'use strict';
import flatten from 'lib/Flatten';

import auth from './auth/main';
import common from './common/main';

export default flatten([common, auth]);
