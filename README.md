# bobflux-monitor
[![npm version](https://badge.fury.io/js/bobflux-monitor.svg)](https://badge.fury.io/js/bobflux-monitor)

Component for time travelling in bobflux application state history.

#Usage
Import package and provide initialized bobflux-monitor to bobflux bootstrap.

```typescript
import { bootstrap } from 'bobflux';
import * as monitor from 'bobflux-monitor';

bootstrap(createDefaultState(), { debugCallback: monitor.init() });
```
```typescript
import { bootstrap } from 'fun-model';
import monitor from 'bobflux-monitor';

bootstrap(createDefaultState(), b.invalidate,  { debugCallback: monitor.init() });
```

# Development
`npm i bobril-build -g`

`npm i`

`bb`

Go to [localhost](http:\\localhost:8080) to see an example.

Library used by [GMC Software Technology](http://www.gmchk.cz).

[![GMC](https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAKkAAAAJDA3MDA4ODRmLWM2ZjQtNDYyNi04NjY2LWFhZjk3NjU3NDg4MQ.png)](http://www.gmchk.cz)
