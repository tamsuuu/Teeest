// Creator: k6 Browser Recorder 0.6.2

import { sleep, group } from 'k6';
import exec from 'k6/execution';
import { tagWithCurrentStageIndex } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js';

import env from '../../environment_variables.js';
import {
  apiMe,
  notification,
  unseenIds,
  playgroundPage,
} from './functional.js';
import { signInForSetup } from '../../setup.js';

export { codeTemplate, executeCode } from './functional.js';

export const options = {
  scenarios: {
    'smoke-test': {
      executor: 'constant-vus',
      duration: '10s',
      gracefulStop: '0s', //stop remaining iterations
    },
    'executeCode-constant-vus': {
      executor: 'constant-vus',
      duration: '10s',
      gracefulStop: '0s',
      exec: 'executeCode',
    },
    'executeCode-per-vu-iteration': {
      executor: 'per-vu-iterations',
      startTime: '12s',
      vus: 50,
      maxDuration: '1m',
      iterations: 2, // iterations to execute
      exec: 'executeCode',
      gracefulStop: '0s',
    },
    'ramp-up-50': {
      executor: 'ramping-vus',
      startTime: '1m15s',
      stages: [
        { duration: '30s', target: 50 }, // ramp up to 0 to 50
        { duration: '1m', target: 50 }, // steady
      ],
      exec: 'executeCode',
      gracefulStop: '0s',
    },
    // 'load-test': {
    //   executor: 'ramping-vus',
    //   stages: [
    //     { duration: '1m', target: 50 }, // normal load ramp up 0 to 50
    //     { duration: '2m', target: 50 }, // steady
    //     { duration: '1m', target: 200 }, // peak hours ramp up 50 to 200
    //     { duration: '5m', target: 200 }, // steady
    //     { duration: '2m', target: 50 }, // peak hours end and back to normal load ramp down 200 to 50
    //     { duration: '1m', target: 0 }, // ramp down 50 to 0
    //   ],
    //   gracefulStop: '0s',
    // },
    // 'stress-test': {
    //   executor: 'ramping-vus',
    //   // startTime: '12m',
    //   stages: [
    //     { duration: '5s', target: 10 }, // below normal load
    //     { duration: '10s', target: 10 }, // steady
    //     { duration: '30s', target: 50 }, // normal load
    //     { duration: '30s', target: 50 }, // steady
    //     { duration: '1m', target: 100 }, // around breaking point
    //     { duration: '2m', target: 100 }, // steady
    //     { duration: '2m', target: 400 }, // beyond breaking point
    //     { duration: '5m', target: 400 }, // steady
    //     { duration: '3m', target: 0 }, // ramp down 400 to 0
    //   ],
    //   gracefulStop: '0s',
    // },
    // 'spike-test': {
    //   executor: 'ramping-vus',
    //   startTime: '15m',
    //   stages: [
    //     { duration: '10s', target: 50 }, //normal load
    //     { duration: '30s', target: 50 },
    //     { duration: '10s', target: 1000 }, //spike to 3000 users
    //     { duration: '2m', target: 1000 }, // steady
    //     { duration: '10s', target: 50 }, // scale down. Recovery stage
    //     { duration: '2m', target: 50 },
    //     { duration: '10s', target: 0 },
    //   ],
    // },
  },
  thresholds: {
    'checks{scenario: executeCode-per-vu-iteration}': [
      { threshold: 'rate == 1' },
    ],
    'checks{scenario: executeCode-constant-vus}': [{ threshold: 'rate == 1' }],
    'checks{scenario: ramp-up-50}': [{ threshold: 'rate == 1' }],
    'http_req_failed{scenario: ramp-up-50, stage: 0}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: ramp-up-50, stage: 1}': [
      { threshold: 'rate == 0' },
    ],

    'http_req_failed{scenario: executeCode-per-vu-iteration}': [
      { threshold: 'rate == 0' },
    ],
    'http_req_failed{scenario: executeCode-constant-vus}': [
      { threshold: 'rate == 0' },
    ],

    'http_req_duration{scenario: executeCode-per-vu-iteration}': [
      'p(100) <= 3000',
    ],
    'http_req_duration{scenario: executeCode-constant-vus}': ['p(100) <= 3000'],
    'http_req_duration{scenario: ramp-up-50}': ['p(100) <= 3000'],
    // //load test
    // 'checks{scenario: load-test}': [{ threshold: 'rate >= 0.95' }],
    // 'http_req_failed{scenario: load-test}': [{ threshold: 'rate <= 0.05' }],
    // 'http_req_duration{scenario: load-test}': ['p(95) <= 3000'],
    // 'group_duration{group:::Play ground page: load-test}': ['p(95) <= 3000'],
    // //metrics for api filter by api_tag, scenarios and stage
    // 'http_req_failed{api_tag: playground, scenario: load-test, stage: 0}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: load-test, stage: 1}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: load-test, stage: 2}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: load-test, stage: 3}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: load-test, stage: 4}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: load-test, stage: 4}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: load-test, stage: 0}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: load-test, stage: 1}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: load-test, stage: 2}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: load-test, stage: 3}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: load-test, stage: 4}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: code-template, scenario: load-test, stage: 0}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: code-template, scenario: load-test, stage: 1}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: code-template, scenario: load-test, stage: 2}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: code-template, scenario: load-test, stage: 3}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: code-template, scenario: load-test, stage: 4}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: load-test, stage: 0}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: load-test, stage: 1}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: load-test, stage: 2}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: load-test, stage: 3}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: load-test, stage: 4}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: notifications, scenario: load-test, stage: 0}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: notifications, scenario: load-test, stage: 1}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: notifications, scenario: load-test, stage: 2}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: notifications, scenario: load-test, stage: 3}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: notifications, scenario: load-test, stage: 4}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: load-test, stage: 0}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: load-test, stage: 1}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: load-test, stage: 2}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: load-test, stage: 3}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: load-test, stage: 4}': [
    //   { threshold: 'rate <= 0.05' },
    // ],

    // //stress test
    // 'http_req_duration{scenario: stress-test}': ['p(95) <= 3000'],
    // 'group_duration{group:::Play ground page: stress-test}': ['p(95) <= 3000'],
    // 'checks{scenario: stress-test}': [{ threshold: 'rate >= 0.95' }],
    // 'http_req_failed{scenario: stress-test}': [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: playground, scenario: stress-test, stage: 0}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: stress-test, stage: 1}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: stress-test, stage: 2}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: stress-test, stage: 3}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: stress-test, stage: 4}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: stress-test, stage: 5}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: stress-test, stage: 6}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: stress-test, stage: 7}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: stress-test, stage: 8}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: stress-test, stage: 0}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: stress-test, stage: 1}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: stress-test, stage: 2}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: stress-test, stage: 3}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: stress-test, stage: 4}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: stress-test, stage: 5}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: stress-test, stage: 6}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: stress-test, stage: 7}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: stress-test, stage: 8}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: code-template, scenario: stress-test, stage: 0}':
    //   [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: code-template, scenario: stress-test, stage: 1}':
    //   [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: code-template, scenario: stress-test, stage: 2}':
    //   [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: code-template, scenario: stress-test, stage: 3}':
    //   [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: code-template, scenario: stress-test, stage: 4}':
    //   [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: code-template, scenario: stress-test, stage: 5}':
    //   [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: code-template, scenario: stress-test, stage: 6}':
    //   [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: code-template, scenario: stress-test, stage: 7}':
    //   [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: code-template, scenario: stress-test, stage: 8}':
    //   [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: unseen-id, scenario: stress-test, stage: 0}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: stress-test, stage: 1}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: stress-test, stage: 2}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: stress-test, stage: 3}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: stress-test, stage: 4}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: stress-test, stage: 5}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: stress-test, stage: 6}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: stress-test, stage: 7}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: stress-test, stage: 8}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: notifications, scenario: stress-test, stage: 0}':
    //   [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: notifications, scenario: stress-test, stage: 1}':
    //   [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: notifications, scenario: stress-test, stage: 2}':
    //   [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: notifications, scenario: stress-test, stage: 3}':
    //   [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: notifications, scenario: stress-test, stage: 4}':
    //   [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: notifications, scenario: stress-test, stage: 5}':
    //   [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: notifications, scenario: stress-test, stage: 6}':
    //   [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: notifications, scenario: stress-test, stage: 7}':
    //   [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: notifications, scenario: stress-test, stage: 8}':
    //   [{ threshold: 'rate <= 0.05' }],
    // 'http_req_failed{api_tag: execute-code, scenario: stress-test, stage: 0}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: stress-test, stage: 1}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: stress-test, stage: 2}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: stress-test, stage: 3}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: stress-test, stage: 4}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: stress-test, stage: 5}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: stress-test, stage: 6}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: stress-test, stage: 7}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: stress-test, stage: 8}': [
    //   { threshold: 'rate <= 0.05' },
    // ],

    // //spike test
    // 'checks{scenario: spike-test}': [{ threshold: 'rate >= 0.95' }],
    // 'http_req_failed{scenario: spike-test}': [{ threshold: 'rate <= 0.05' }],
    // 'http_req_duration{scenario: spike-test}': ['p(95) <= 3000'],
    // 'group_duration{group:::Play ground page: spike-test}': ['p(95) <= 3000'],
    // 'http_req_failed{api_tag: playground, scenario: spike-test, stage: 0}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: spike-test, stage: 1}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: spike-test, stage: 2}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: spike-test, stage: 3}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: spike-test, stage: 4}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: spike-test, stage: 5}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: playground, scenario: spike-test, stage: 6}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: spike-test, stage: 0}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: spike-test, stage: 1}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: spike-test, stage: 2}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: spike-test, stage: 3}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: spike-test, stage: 4}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: spike-test, stage: 5}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: me, scenario: spike-test, stage: 6}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: code-template, scenario: spike-test, stage: 0}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: code-template, scenario: spike-test, stage: 1}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: code-template, scenario: spike-test, stage: 2}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: code-template, scenario: spike-test, stage: 3}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: code-template, scenario: spike-test, stage: 4}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: code-template, scenario: spike-test, stage: 5}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: code-template, scenario: spike-test, stage: 6}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: spike-test, stage: 0}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: spike-test, stage: 1}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: spike-test, stage: 2}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: spike-test, stage: 3}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: spike-test, stage: 4}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: spike-test, stage: 5}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: unseen-id, scenario: spike-test, stage: 6}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: notifications, scenario: spike-test, stage: 0}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: notifications, scenario: spike-test, stage: 1}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: notifications, scenario: spike-test, stage: 2}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: notifications, scenario: spike-test, stage: 3}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: notifications, scenario: spike-test, stage: 4}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: notifications, scenario: spike-test, stage: 5}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: notifications, scenario: spike-test, stage: 6}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: spike-test, stage: 0}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: spike-test, stage: 1}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: spike-test, stage: 2}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: spike-test, stage: 3}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: spike-test, stage: 4}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: spike-test, stage: 5}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
    // 'http_req_failed{api_tag: execute-code, scenario: spike-test, stage: 6}': [
    //   { threshold: 'rate <= 0.05' },
    // ],
  },
};

export const setup = () => {
  const user = signInForSetup(env.stackAccountsURL, env.credential, env.params); // get request response body for sign in user
  // get request response body for created session
  // const session = createSession(
  //   env.stackAccountsURL,
  //   env.student_jwt,
  //   env.create_room
  // );
  const { jwt } = JSON.parse(user); //user is string so it needs to parse into json obj to destructurize.
  // const room = JSON.parse(session); // parse session body
  // const { identifier } = room.data; // destruturize to get identifier

  const data = {
    env,
    // identifier,
    jwt,
  };
  //return data as object that can be use in export functions.
  return data;
};

export default function (data) {
  let scenario = exec.vu.tags['scenario'];
  // if one scenarios pass all the api request in default function will have stage tag eg: stage: 0 so you can use it in more detailed metrics
  if (
    scenario === 'load-test' ||
    scenario === 'stress-test' ||
    scenario === 'spike-test'
  )
    tagWithCurrentStageIndex(); // all api will have a stage tag
  group(`Play ground page: ${scenario}`, () => {
    playgroundPage(data);
    apiMe(data);
    unseenIds(data);
    notification(data);
  });
}
