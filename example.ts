import * as b from 'bobril';
import { bootstrap } from 'fun-model';
import { createDefaultState } from './example/state';
import { mainPage } from './example/mainPage';
import * as monitor from './index';

// Bobflux
// bootstrap(createDefaultState(), { debugCallback: monitor.init() });

// fun-model
bootstrap(createDefaultState(), b.invalidate, { debugCallback: monitor.init() });

b.routes(
    b.route({ handler: mainPage }, [
        b.route({ handler: mainPage })
    ])
);
