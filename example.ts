import * as b from 'bobril';
import { bootstrap } from 'bobflux';
import * as bobfluxMonitor from './index';
import { page as mainPage } from './example/page';
import { createDefaultState, appCursor} from './example/state';

bootstrap(createDefaultState(), bobfluxMonitor.init());
b.routes(
    b.route({handler: mainPage }, [
         b.route({handler: mainPage })
    ])
);
