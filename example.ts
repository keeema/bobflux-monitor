import * as b from 'bobril';
import * as monitor from './index';
import { bootstrap } from 'fun-model';
import { createDefaultState} from './example/state';
import mainPage from './example/mainPage';

// Bobflux
// bootstrap(createDefaultState(), monitor.init());

// fun-model
bootstrap(createDefaultState(), b.invalidate,  monitor.init());

b.routes(
    b.route({handler: mainPage }, [
         b.route({handler: mainPage })
    ])
);
