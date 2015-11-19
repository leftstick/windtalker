/**
 *  Entrance of common service
 *
 *
 *  @author  Howard.Zuo
 *  @date    Nov 19, 2015
 *
 */
import ui from './ui/main';
import service from './service/main';
import listener from './listener/main';

export default [...ui, ...service, ...listener];
