import http from 'k6/http';
import { check, group, sleep } from 'k6';
import exec from 'k6/execution';
import { tagWithCurrentStageIndex } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js'; // remote modules
import env from '../../environment_variables.js';
import {
  verifyToken,
  unreadConversation,
  stackedFeatures,
  stackedCourse,
  courseModules,
  courseProgress,
  purchaseType,
} from '../../functional.js';

export const options = {
  scenarios: {
    'test-api-durations': {
      executor: 'constant-vus',
      vus: 1,
      duration: '10s',
      gracefulStop: '0s',
    },
    'iteration-per-vus': {
      executor: 'per-vu-iterations',
      vus: 200,
      iterations: 200,
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

export function setup() {
  let userInfo = [];
  console.log('Running Setup...');
  for (let element = 0; element < env.users.length; element += 1) {
    let loginRequest = http.post(
      'https://accounts-staging.stacktrek.com/api/auth/login',
      `{"email":"${env.users[element]}","password":"Password@123"}`,
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'content-type': 'application/json; charset=UTF-8',
        },
      }
    );
    userInfo.push(loginRequest.json());
    if (element === 0) {
      console.log(`${element + 1} current user...`);
    } else {
      console.log(`${element + 1} current users...`);
    }
  }

  console.log('Iteration Started....');

  return userInfo;
}
// CourseOverview
export default function courseOverview(data) {
  let scenario = exec.scenario.name;
  if (
    scenario === 'load-test' ||
    scenario === 'stress-test' ||
    scenario === 'spike-test'
  )
    tagWithCurrentStageIndex();
  group('Course Overview', () => {
    group('Course Overviews Page', () => {
      const courseOverview = http.get(
        `${env.stacked.url}/courses/3KpYzeEJybGQ/overview`
      );

      check(courseOverview, {
        'Successfully render at 1 seconds': (r) => r.timings.duration < 1000,
      });

      sleep(1);
    });

    group('Course Overviews API', () => {
      // Check verify token
      verifyToken(
        env.stacked.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      // Unread conversation
      unreadConversation(
        env.stacked.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      // Check stacked user features
      stackedFeatures(
        env.stacked.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      // Check stacked
      stackedCourse(
        env.stacked.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        env.stacked.overview.course_key,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      // Check courseProgresses
      courseProgress(
        env.stacked.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        env.stacked.overview.course_id,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      // Check courseModules
      courseModules(
        env.stacked.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        env.stacked.overview.course_id,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      // Check userPurchaseType
      purchaseType(
        env.stacked.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        env.stacked.overview.course_id,
        data[Math.floor(Math.random() * data.length)].user.username
      );
    });
  });
}
