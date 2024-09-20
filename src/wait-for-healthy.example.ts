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
  await firstValueFrom(probe.getObservable().pipe(filter(status => status === 'healthy')));
  console.log('Healthy!');
}
