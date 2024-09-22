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
