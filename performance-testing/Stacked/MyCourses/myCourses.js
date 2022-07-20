import { group, sleep } from 'k6';
import exec from 'k6/execution';
import { tagWithCurrentStageIndex } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js'; // remote modules

import env from '../../environment_variables.js';
import {
  verifyToken,
  unreadConversation,
  stackedFeatures,
  organizationCourse,
  invoiceOrganizationCourse,
  visitMyCourse,
  notification,
  states,
  unseenIds,
  courseLanguage,
  courseSubject,
  academyCareerCourse,
  academySkillCourse,
  ongoingCourse,
  activeCourse,
  signIn,
  redirectingStacked,
} from '../../api.js';

//exported functions to used in scenarios exec
export { signIn } from '../../api.js';

import { signInForSetup } from '../../setup.js';

export const options = {
  scenarios: {
    'load-test': {
      executor: 'ramping-vus',
      stages: [
        { duration: '1m', target: 50 }, //normal load
        { duration: '2m', target: 50 },
        { duration: '1m', target: 250 }, //peak hours
        { duration: '5m', target: 250 }, //steady
        { duration: '1m', target: 50 }, // peak hours end
        { duration: '2m', target: 50 }, // continue at 50 for additional 5 mins
        { duration: '1m', target: 0 }, //ramp down to 0 users
      ],
      gracefulStop: '0s',
    },
    'stress-test': {
      executor: 'ramping-vus',
      startTime: '13m',
      stages: [
        { duration: '30s', target: 10 }, //below normal load
        { duration: '30s', target: 50 }, //normal load
        { duration: '1m', target: 100 }, //around breaking point
        { duration: '3m', target: 300 }, //beyond breaking point
        { duration: '5m', target: 300 }, //beyond breaking point
        { duration: '3m', target: 500 },
        { duration: '5m', target: 500 },
        { duration: '1m', target: 0 }, //ramp down to 0 users
      ],
      gracefulStop: '0s',
    },
    // 'sign-in': {
    //   executor: 'constant-vus',
    //   startTime: '32m',
    //   vus: 150,
    //   duration: '5m',
    //   gracefulStop: '0s',
    //   exec: 'signIn', // execute sign-in functions only
    // },
  },

  thresholds: {
    //pass checks if reach 100%
    // 'http_req_failed{scenario: sign-in}': [{ threshold: 'rate <= 0.05' }],
    // 'http_req_duration{scenario: sign-in}': ['p(95) <= 3000'],
    //pass if error is less than 5%
    'Error Rate': [{ threshold: 'rate <= 0.05' }],
    //pass if no error found
    'Error Rate{name: sign-in}': [{ threshold: 'rate <= 0.05' }], // filtered by name tag name: sign-in
    'Error Rate{name: redirect-to-stacked}': [{ threshold: 'rate <= 0.05' }],
    'Error Rate{name: stacked-my-courses-page}': [
      { threshold: 'rate <= 0.05' },
    ],
    'Error Rate{name: unread-conversations}': [{ threshold: 'rate <= 0.05' }],
    'Error Rate{name: verify-token}': [{ threshold: 'rate <= 0.05' }],
    'Error Rate{name: features}': [{ threshold: 'rate <= 0.05' }],
    'Error Rate{name: notification}': [{ threshold: 'rate <= 0.05' }],
    'Error Rate{name: organization-course}': [{ threshold: 'rate <= 0.05' }],
    'Error Rate{name: invoice-organization-course}': [
      { threshold: 'rate <= 0.05' },
    ],
    'Error Rate{name: states }': [{ threshold: 'rate <= 0.05' }],
    'Error Rate{name: unseen-ids }': [{ threshold: 'rate <= 0.05' }],
    'Error Rate{name: course-language }': [{ threshold: 'rate <= 0.05' }],
    'Error Rate{name: course-subject }': [{ threshold: 'rate <= 0.05' }],
    'Error Rate{name: academy-career }': [{ threshold: 'rate <= 0.05' }],
    'Error Rate{name: academy-skill }': [{ threshold: 'rate <= 0.05' }],
    'Error Rate{name: ongoing-course }': [{ threshold: 'rate <= 0.05' }],
    'Error Rate{name: active-course }': [{ threshold: 'rate <= 0.05' }],
    // load test filter by scenario and stage tag
    'http_req_duration{scenario: load-test}': ['p(95) <= 3000'],
    'http_req_failed{scenario: load-test}': [{ threshold: 'rate <= 0.05' }],
    'http_req_failed{scenario: load-test, stage: 0 }': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{scenario: load-test, stage: 1 }': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{scenario: load-test, stage: 2 }': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{scenario: load-test, stage: 3 }': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{scenario: load-test, stage: 4 }': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{scenario: load-test, stage: 5 }': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{scenario: load-test, stage: 6 }': [
      { threshold: 'rate <= 0.05' },
    ],
    //pass if 95% of group duration is less than or equal 3 seconds
    'group_duration{group:::Authenticate and redirect: load-test, stage: 0}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::Authenticate and redirect: load-test, stage: 1}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::Authenticate and redirect: load-test, stage: 2}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::Authenticate and redirect: load-test, stage: 3}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::Authenticate and redirect: load-test, stage: 4}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::Authenticate and redirect: load-test, stage: 5}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::Authenticate and redirect: load-test, stage: 6}': [
      'p(95) <= 3000',
    ],

    'group_duration{group:::My courses page: load-test, stage: 0}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::My courses page: load-test, stage: 1}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::My courses page: load-test, stage: 2}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::My courses page: load-test, stage: 3}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::My courses page: load-test, stage: 4}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::My courses page: load-test, stage: 5}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::My courses page: load-test, stage: 6}': [
      'p(95) <= 3000',
    ],

    //stress test
    'http_req_duration{scenario: stress-test}': ['p(95) <= 3000'],
    'http_req_failed{scenario: stress-test, stage: 0 }': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{scenario: stress-test, stage: 1 }': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{scenario: stress-test, stage: 2 }': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{scenario: stress-test, stage: 3 }': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{scenario: stress-test, stage: 4 }': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{scenario: stress-test, stage: 5 }': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{scenario: stress-test, stage: 6 }': [
      { threshold: 'rate <= 0.05' },
    ],
    'http_req_failed{scenario: stress-test, stage: 7 }': [
      { threshold: 'rate <= 0.05' },
    ],
    //pass if 95% of group duration is less than or equal 3 seconds
    'group_duration{group:::Authenticate and redirect: stress-test, stage: 0}':
      ['p(95) <= 3000'],
    'group_duration{group:::Authenticate and redirect: stress-test, stage: 1}':
      ['p(95) <= 3000'],
    'group_duration{group:::Authenticate and redirect: stress-test, stage: 2}':
      ['p(95) <= 3000'],
    'group_duration{group:::Authenticate and redirect: stress-test, stage: 3}':
      ['p(95) <= 3000'],
    'group_duration{group:::Authenticate and redirect: stress-test, stage: 4}':
      ['p(95) <= 3000'],
    'group_duration{group:::Authenticate and redirect: stress-test, stage: 5}':
      ['p(95) <= 3000'],
    'group_duration{group:::Authenticate and redirect: stress-test, stage: 6}':
      ['p(95) <= 3000'],
    'group_duration{group:::Authenticate and redirect: stress-test, stage: 7}':
      ['p(95) <= 3000'],

    'group_duration{group:::My courses page: stress-test, stage: 0}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::My courses page: stress-test, stage: 1}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::My courses page: stress-test, stage: 2}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::My courses page: stress-test, stage: 3}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::My courses page: stress-test, stage: 4}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::My courses page: stress-test, stage: 5}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::My courses page: stress-test, stage: 6}': [
      'p(95) <= 3000',
    ],
    'group_duration{group:::My courses page: stress-test, stage: 7}': [
      'p(95) <= 3000',
    ],
  },
};

//call first before the default function
export const setup = () => {
  const user = signInForSetup(env.stackAccountsURL, env.credential, env.params); //get api response body after user sign in
  const { jwt } = JSON.parse(user); //user is string so it needs to parse into json obj to destructurize.
  const data = {
    env,
    jwt,
  };
  //data can be use in export functions.
  return data;
};
// data parameter is from set up
export default function (data) {
  // get current scenario
  let scenario = exec.vu.tags['scenario'];
  if (scenario === 'load-test' || scenario === 'stress-test')
    tagWithCurrentStageIndex(); // add stage tag in all apis eg: stage: 0
  // user will sign in
  group(`Authenticate and redirect: ${scenario}`, () => {
    signIn(data);
    sleep(1);
    //redirect to stacked
    redirectingStacked(data);
  });

  group(`My courses page: ${scenario}`, () => {
    //visit my courses
    visitMyCourse(data);
    //call api's
    verifyToken(data);
    unreadConversation(data);
    stackedFeatures(data);
    states(data);
    unseenIds(data);
    notification(data);
    organizationCourse(data);
    invoiceOrganizationCourse(data);
    courseLanguage(data);
    courseSubject(data);
    academyCareerCourse(data);
    academySkillCourse(data);
    ongoingCourse(data);
    activeCourse(data);
  });
}
