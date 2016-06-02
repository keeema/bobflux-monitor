import * as b from 'bobril';
import * as monitor from './index';
import { bootstrap } from 'bobflux';
import { createDefaultState} from './example/state';
import mainPage from './example/mainPage';

bootstrap(createDefaultState(), monitor.init());

b.routes(
    b.route({handler: mainPage }, [
         b.route({handler: mainPage })
    ])
);
