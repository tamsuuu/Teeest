import { Rate } from 'k6/metrics';
import { EnrollPageFreeCourse } from './enrollPage-Free.js';
import { JoinAsInstructor } from './joinAsInstructor.js';

export const errorRate = new Rate('error_rate');

export const options = {
    scenarios: {
        enrollPage: {
          executor: 'constant-vus',
          vus: 50,
          duration: '1m',
        },
      },
      insecureSkipTLSVerify: true,
      thresholds: {
        http_req_failed: ['rate<0.50'],
        http_req_duration: [
          { threshold: 'p(95)<10000', abortOnFail: false },
          { threshold: 'p(90)<10000', abortOnFail: false },
        ],
        checks: ['rate>0.95'],
        'Error Rate': ['rate<0.01'],
      },
}

export default function(){
    EnrollPageFreeCourse();
    JoinAsInstructor();
}