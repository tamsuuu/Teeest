import { group, sleep } from 'k6';
import exec from 'k6/execution';
import { tagWithCurrentStageIndex } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js';

import env from '../../environment_variables.js';

import {
  apiMe,
  meetings,
  unseenIds,
  notification,
  sessionDashboard,
} from './functional.js';

import { createSession, signInForSetup } from '../../setup.js';

export const options = {
  scenarios: {
    'smoke-test': {
      executor: 'constant-vus',
      duration: '5m',
      gracefulStop: '0s', //stop remaining iterations
    },
    // 'per-vu-iteration': {
    //   executor: 'per-vu-iterations',
    //   vus: 3000, // has existing 3000 vus
    //   maxDuration: '1m',
    //   iterations: 1, // 1 iterations per vus
    //   gracefulStop: '0s',
    // },
    'load-test': {
      executor: 'ramping-vus',
      stages: [
        { duration: '1m', target: 50 }, // normal load ramp up 0 to 50
        { duration: '2m', target: 50 }, // steady
        { duration: '1m', target: 200 }, // peak hours ramp up 50 to 200
        { duration: '5m', target: 200 }, // steady
        { duration: '2m', target: 50 }, // peak hours end and back to normal load ramp down 200 to 50
        { duration: '1m', target: 0 }, // ramp down 50 to 0
      ],
      gracefulStop: '0s',
    },
    'stress-test': {
      executor: 'ramping-vus',
      startTime: '1m',
      stages: [
        { duration: '5s', target: 10 }, // below normal load
        { duration: '10s', target: 10 }, // steady
        { duration: '30s', target: 50 }, // normal load
        { duration: '30s', target: 50 }, // steady
        { duration: '1m', target: 100 }, // around breaking point
        { duration: '2m', target: 100 }, // steady
        { duration: '1m', target: 400 }, // beyond breaking point
        { duration: '5m', target: 400 }, // steady
        { duration: '3m', target: 0 }, // ramp down 400 to 0
      ],
      gracefulStop: '0s',
    },
    'spike-test': {
      executor: 'ramping-vus',
      startTime: '26m30s',
      stages: [
        { duration: '10s', target: 50 }, //normal load
        { duration: '30s', target: 50 },
        { duration: '10s', target: 3000 }, //spike to 3000 users
        { duration: '2m', target: 3000 }, // steady
        { duration: '10s', target: 50 }, // scale down. Recovery stage
        { duration: '2m', target: 50 },
        { duration: '10s', target: 0 },
      ],
    },
  },
  thresholds: {
    //load test
    'checks{scenario: load-test}': [{ threshold: 'rate >= 0.95' }],
    'http_req_failed{scenario: load-test}': [{ threshold: 'rate <= 0.05' }],
    'http_req_duration{scenario: load-test}': ['p(95) <= 3000'],
    'group_duration{group:::Training Dashboard: load-test}': ['p(95) <= 3000'],
    //metrics for api filter by api_tag, scenarios and stage
    'http_req_failed{api_tag: liveshare-dashboard, scenario: load-test, stage: 0}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: load-test, stage: 1}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: load-test, stage: 2}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: load-test, stage: 3}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: load-test, stage: 4}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: load-test, stage: 4}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: me, scenario: load-test, stage: 0}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: me, scenario: load-test, stage: 1}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: me, scenario: load-test, stage: 2}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: me, scenario: load-test, stage: 3}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: me, scenario: load-test, stage: 4}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: load-test, stage: 0}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: load-test, stage: 1}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: load-test, stage: 2}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: load-test, stage: 3}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: load-test, stage: 4}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: load-test, stage: 0}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: load-test, stage: 1}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: load-test, stage: 2}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: load-test, stage: 3}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: load-test, stage: 4}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: notifications, scenario: load-test, stage: 0}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: notifications, scenario: load-test, stage: 1}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: notifications, scenario: load-test, stage: 2}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: notifications, scenario: load-test, stage: 3}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: notifications, scenario: load-test, stage: 4}': [
      { threshold: 'rate <= 0.05' },
    ],

    //stress test
    'http_req_duration{scenario: stress-test}': ['p(95) <= 3000'],
    'group_duration{group:::Training Dashboard: stress-test}': [
      'p(95) <= 3000',
    ],
    'checks{scenario: stress-test}': [{ threshold: 'rate >= 0.95' }],
    'http_req_failed{scenario: stress-test}': [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: stress-test, stage: 0}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: stress-test, stage: 1}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: stress-test, stage: 2}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: stress-test, stage: 3}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: stress-test, stage: 4}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: stress-test, stage: 5}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: stress-test, stage: 6}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: stress-test, stage: 7}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: stress-test, stage: 8}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: me, scenario: stress-test, stage: 0}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: me, scenario: stress-test, stage: 1}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: me, scenario: stress-test, stage: 2}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: me, scenario: stress-test, stage: 3}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: me, scenario: stress-test, stage: 4}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: me, scenario: stress-test, stage: 5}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: me, scenario: stress-test, stage: 6}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: me, scenario: stress-test, stage: 7}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: me, scenario: stress-test, stage: 8}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: stress-test, stage: 0}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: stress-test, stage: 1}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: stress-test, stage: 2}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: stress-test, stage: 3}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: stress-test, stage: 4}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: stress-test, stage: 5}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: stress-test, stage: 6}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: stress-test, stage: 7}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: stress-test, stage: 8}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: stress-test, stage: 0}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: stress-test, stage: 1}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: stress-test, stage: 2}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: stress-test, stage: 3}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: stress-test, stage: 4}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: stress-test, stage: 5}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: stress-test, stage: 6}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: stress-test, stage: 7}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: stress-test, stage: 8}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: notifications, scenario: stress-test, stage: 0}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: notifications, scenario: stress-test, stage: 1}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: notifications, scenario: stress-test, stage: 2}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: notifications, scenario: stress-test, stage: 3}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: notifications, scenario: stress-test, stage: 4}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: notifications, scenario: stress-test, stage: 5}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: notifications, scenario: stress-test, stage: 6}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: notifications, scenario: stress-test, stage: 7}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: notifications, scenario: stress-test, stage: 8}':
      [{ threshold: 'rate <= 0.05' }],

    //spike test
    'checks{scenario: spike-test}': [{ threshold: 'rate >= 0.95' }],
    'http_req_failed{scenario: spike-test}': [{ threshold: 'rate <= 0.05' }],
    'http_req_duration{scenario: spike-test}': ['p(95) <= 3000'],
    'group_duration{group:::Training Dashboard: spike-test}': ['p(95) <= 3000'],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: spike-test, stage: 0}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: spike-test, stage: 1}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: spike-test, stage: 2}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: spike-test, stage: 3}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: spike-test, stage: 4}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: spike-test, stage: 5}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: liveshare-dashboard, scenario: spike-test, stage: 6}':
      [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{api_tag: me, scenario: spike-test, stage: 0}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: me, scenario: spike-test, stage: 1}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: me, scenario: spike-test, stage: 2}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: me, scenario: spike-test, stage: 3}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: me, scenario: spike-test, stage: 4}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: me, scenario: spike-test, stage: 5}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: me, scenario: spike-test, stage: 6}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: spike-test, stage: 0}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: spike-test, stage: 1}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: spike-test, stage: 2}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: spike-test, stage: 3}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: spike-test, stage: 4}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: spike-test, stage: 5}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: meetings, scenario: spike-test, stage: 6}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: spike-test, stage: 0}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: spike-test, stage: 1}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: spike-test, stage: 2}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: spike-test, stage: 3}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: spike-test, stage: 4}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: spike-test, stage: 5}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: unseen-id, scenario: spike-test, stage: 6}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: notifications, scenario: spike-test, stage: 0}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: notifications, scenario: spike-test, stage: 1}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: notifications, scenario: spike-test, stage: 2}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: notifications, scenario: spike-test, stage: 3}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: notifications, scenario: spike-test, stage: 4}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: notifications, scenario: spike-test, stage: 5}': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{api_tag: notifications, scenario: spike-test, stage: 6}': [
      { threshold: 'rate <= 0.05' },
    ],
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
  // trainers page
  group(`Trainers Dashboard: ${scenario}`, () => {
    //visit trainers dashboard
    sessionDashboard(data);
    //call api
    apiMe(data);
    meetings(data);
    unseenIds(data);
    notification(data);
  });
}

// export const teardown = (data) => {};
