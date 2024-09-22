# rxjs-probe-examples

- [Subscribe](#subscribe)
- [Wait for healthy](#wait-for-healthy)
- [Custom probe performer](#custom-probe-performer)

### Subscribe

```sh
npm run subscribe
```

```ts
import { Probe } from '@rxjs-probe/core';
import { HttpProbePerformer } from '@rxjs-probe/http-probe-performer';

const probe = new Probe({
  performer: new HttpProbePerformer({
    host: 'github.com',
    path: '/a179346/rxjs-probe',
    scheme: 'HTTPS',
  }),
  initialDelaySeconds: 1,
  periodSeconds: 1,
  timeoutSeconds: 1,
  successThreshold: 1,
  failureThreshold: 1,
});

probe.createObservable().subscribe(status => {
  console.log('status:', status);
});

// Expected output:
// 0s -> status: unknown
// 1s -> status: healthy
```

### Wait for healthy

```sh
npm run wait-for-healthy
```

```ts
import { firstValueFrom, filter } from 'rxjs';
import { Probe } from '@rxjs-probe/core';
import { HttpProbePerformer } from '@rxjs-probe/http-probe-performer';

main();

async function main() {
  const probe = new Probe({
    performer: new HttpProbePerformer({
      host: 'github.com',
      path: '/a179346/rxjs-probe',
      scheme: 'HTTPS',
    }),
    initialDelaySeconds: 3,
  });

  console.log('Waiting for healthy status...');

  await firstValueFrom(probe.createObservable().pipe(filter(status => status === 'healthy')));

  console.log('Healthy!');
}

// Expected output:
// 0s -> Waiting for healthy status...
// 3s -> Healthy!
```

### Custom probe performer

```sh
npm run custom-probe-performer
```

```ts
import { Probe, ProbePerformer } from '@rxjs-probe/core';
import axios from 'axios';

const probe = new Probe({
  performer: new ProbePerformer(async timeoutSeconds => {
    console.log('Performing probe...');
    await axios({
      url: 'https://github.com/a179346/rxjs-probe',
      timeout: timeoutSeconds * 1000,
      validateStatus: status => status === 200,
    });
  }),
});

probe.createObservable().subscribe(status => {
  console.log('status:', status);
});

// Expected output:
// 0s -> status: unknown
// 0s -> Performing probe...
// 0s -> status: healthy
// 10s -> Performing probe...
// 20s -> Performing probe...
// 30s -> Performing probe...
// ....
```