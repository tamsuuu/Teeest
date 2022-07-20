//init
import { group } from 'k6';
import exec from 'k6/execution';
import { tagWithCurrentStageIndex } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js'; // remote modules
import { signUp } from '../api.js';
import env from '../environment_variables.js';

const data = JSON.parse(open('../data.json'));

export const options = {
  scenarios: {
    'smoke-test': {
      executor: 'constant-vus',
      vus: 1,
      duration: '10s',
      gracefulStop: '0s',
    },
    'iteration-per-vus': {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      maxDuration: '5m',
      gracefulStop: '0s',
    },
    'load-test': {
      executor: 'ramping-vus',
      stages: [
        { duration: '1m', target: 50 }, //normal load
        { duration: '1m', target: 50 },
        { duration: '3m', target: 200 }, //peak hours
        { duration: '5m', target: 200 }, //steady
        { duration: '2m', target: 50 }, // peak hours end
        { duration: '2m', target: 50 },
        { duration: '1m', target: 0 }, //ramp down to 0 users
      ],
      gracefulStop: '0s',
    },
    'stress-test': {
      executor: 'ramping-vus',
      startTime: '15min10s',
      stages: [
        { duration: '1m', target: 50 }, //below normal load
        { duration: '1m', target: 50 },
        { duration: '1m', target: 100 }, //normal load
        { duration: '1m', target: 100 },
        { duration: '1m', target: 190 }, //around breaking point
        { duration: '1m', target: 190 },
        { duration: '5m', target: 3000 }, //beyond breaking point
        { duration: '10m', target: 3000 },
        { duration: '3m', target: 0 }, //ramp down to 0 users
      ],
      gracefulStop: '0s',
    },
    'spike-test': {
      executor: 'ramping-vus',
      startTime: '39min20s',
      stages: [
        { duration: '10s', target: 5 }, //below normal load
        { duration: '10s', target: 5 },
        { duration: '10s', target: 3000 },
        { duration: '5m', target: 3000 },
        { duration: '10s', target: 50 },
        { duration: '2m', target: 50 },
        { duration: '10s', target: 0 },
      ],
      gracefulStop: '0s',
    },
  },
  thresholds: {
    //load test
    'http_req_failed{scenario: load-test, stage: 0}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: load-test, stage: 1}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: load-test, stage: 2}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: load-test, stage: 3}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: load-test, stage: 4}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: load-test, stage: 5}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: load-test, stage: 6}': [
      { threshold: 'rate == 0' },
    ],

    'http_req_duration{scenario: load-test, stage: 0}': ['p(99) <= 1000'],
    'http_req_duration{scenario: load-test, stage: 1}': ['p(99) <= 1000'],
    'http_req_duration{scenario: load-test, stage: 2}': ['p(99) <= 3000'],
    'http_req_duration{scenario: load-test, stage: 3}': ['p(99) <= 3000'],
    'http_req_duration{scenario: load-test, stage: 4}': ['p(99) <= 1000'],
    'http_req_duration{scenario: load-test, stage: 5}': ['p(99) <= 1000'],
    'http_req_duration{scenario: load-test, stage: 6}': ['p(99) <= 1000'],
    // stress test
    'http_req_failed{scenario: stress-test, stage: 0}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: stress-test, stage: 1}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: stress-test, stage: 2}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: stress-test, stage: 3}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: stress-test, stage: 4}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: stress-test, stage: 5}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: stress-test, stage: 6}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: stress-test, stage: 7}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: stress-test, stage: 8}': [
      { threshold: 'rate == 0' },
    ],

    'http_req_duration{scenario: stress-test, stage: 0}': ['p(100) <= 3000'],
    'http_req_duration{scenario: stress-test, stage: 1}': ['p(100) <= 3000'],
    'http_req_duration{scenario: stress-test, stage: 2}': ['p(100) <= 3000'],
    'http_req_duration{scenario: stress-test, stage: 3}': ['p(100) <= 3000'],
    'http_req_duration{scenario: stress-test, stage: 4}': ['p(100) <= 3000'],
    'http_req_duration{scenario: stress-test, stage: 5}': ['p(100) <= 3000'],
    'http_req_duration{scenario: stress-test, stage: 6}': ['p(100) <= 3000'],
    'http_req_duration{scenario: stress-test, stage: 7}': ['p(100) <= 3000'],
    'http_req_duration{scenario: stress-test, stage: 8}': ['p(100) <= 3000'],

    //spike test
    'http_req_failed{scenario: spike-test, stage: 0}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: spike-test, stage: 1}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: spike-test, stage: 2}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: spike-test, stage: 3}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: spike-test, stage: 4}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: spike-test, stage: 5}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: spike-test, stage: 6}': [
      { threshold: 'rate == 0' },
    ],

    'http_req_duration{scenario: spike-test, stage: 0}': ['p(100) <= 3000'],
    'http_req_duration{scenario: spike-test, stage: 1}': ['p(100) <= 3000'],
    'http_req_duration{scenario: spike-test, stage: 2}': ['p(100) <= 3000'],
    'http_req_duration{scenario: spike-test, stage: 3}': ['p(100) <= 3000'],
    'http_req_duration{scenario: spike-test, stage: 4}': ['p(100) <= 3000'],
    'http_req_duration{scenario: spike-test, stage: 5}': ['p(100) <= 3000'],
    'http_req_duration{scenario: spike-test, stage: 6}': ['p(100) <= 3000'],
  },
};

export default function () {
  // get current scenario
  let scenario = exec.vu.tags['scenario'];
  if (
    scenario === 'load-test' ||
    scenario === 'stress-test' ||
    scenario === 'spike-test'
  )
    tagWithCurrentStageIndex();
  let userInfo = data.user[Math.floor(Math.random() * data.user.length)];
  group('Sign up users', () => {
    signUp(env.stackAccountsURL, userInfo);
  });
}
