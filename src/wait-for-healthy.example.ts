import { takeWhile } from 'rxjs/operators';
import { Probe } from '@rxjs-probe/core';
import { HttpProbePerformer } from '@rxjs-probe/http-probe-performer';
import { lastValueFrom } from 'rxjs';

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
  await lastValueFrom(probe.getObservable().pipe(takeWhile(status => status !== 'healthy')));

  console.log('Healthy!');
}
