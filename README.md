# bobflux-monitor
[![npm version](https://badge.fury.io/js/bobflux-monitor.svg)](https://badge.fury.io/js/bobflux-monitor)

Component for time travelling in bobflux application state history.

#Usage
Import package and provide initialized bobflux-monitor to bobflux bootstrap.

```typescript
import { bootstrap } from 'node_modules/bobflux/dist/src/index';
import * as bobfluxMonitor from 'node_modules/bobflux-monitor/index';

bootstrap(createDefaultState(), bobfluxMonitor.init());
```

# Development
`npm i`

`gulp dwp`

# Example
Go to example folder and type:

`npm i`

`gulp watch`

Go to [localhost](http:\\localhost:8000) .

Library used by [GMC Software Technology](http://www.gmchk.cz).

[![GMC](https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAKkAAAAJDA3MDA4ODRmLWM2ZjQtNDYyNi04NjY2LWFhZjk3NjU3NDg4MQ.png)](http://www.gmchk.cz)
