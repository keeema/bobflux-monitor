import * as b from '../node_modules/bobril/index';
import { bootstrap } from '../node_modules/bobflux/dist/src/index';
import * as bobfluxMonitor from '../node_modules/bobflux-monitor/index';
import { page as mainPage } from './page';
import { createDefaultState, appCursor} from './state';

bootstrap(createDefaultState(), bobfluxMonitor.init());
b.routes(
    b.route({handler: mainPage }, [
         b.route({handler: mainPage })
    ])
);
