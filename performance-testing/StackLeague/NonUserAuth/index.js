import http from 'k6/http';
import { Rate } from 'k6/metrics';
import { landingPage } from './Home.js';
import { rankingPage } from './Rankings.js';
export const errorRate = new Rate('Error Rate');

export let options = {
  scenarios: {
    StackleagueHomePage: {
      executor: 'constant-vus',
      vus: 1,
      duration: '20s',
    },
  },
  insecureSkipTLSVerify: true,
  thresholds: {
    http_req_failed: ['rate<0.50'],
    http_req_duration: [
      { threshold: 'p(95)<1500', abortOnFail: false },
      { threshold: 'p(90)<1500', abortOnFail: false },
    ],
    checks: ['rate>0.95'],
    'Error Rate': ['rate<0.01'],
  },
};

export default function () {
  landingPage();
  rankingPage();
}
