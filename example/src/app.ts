import * as b from 'bobril';
import { bootstrap } from 'bobflux';
import * as bobfluxMonitor from 'bobflux-monitor';
import { page as mainPage } from './page';
import { createDefaultState, appCursor} from './state';

bootstrap(createDefaultState(), bobfluxMonitor.init());
b.routes(
    b.route({handler: mainPage }, [
         b.route({handler: mainPage })
    ])
);
