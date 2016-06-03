import * as b from 'bobril';
import { bootstrap } from 'fun-model';
import { createDefaultState} from './example/state';
import mainPage from './example/mainPage';
import monitor from './index';

// Bobflux
// bootstrap(createDefaultState(), monitor());

// fun-model
bootstrap(createDefaultState(), b.invalidate,  monitor());

b.routes(
    b.route({handler: mainPage }, [
         b.route({handler: mainPage })
    ])
);
