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

probe.getObservable().subscribe(status => {
  console.log('status:', status);
});
