//init
import { group } from 'k6';
import { signInForSetup } from '../setup.js';
import exec from 'k6/execution';
import { tagWithCurrentStageIndex } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js'; // remote modules

import env from '../environment_variables.js';
import {
  verifyToken,
  appliedJobs,
  availableJobs,
  features,
  locations,
  states,
} from '../api.js';

export const options = {
  scenarios: {
    // 'test-api-durations': {
    //   executor: 'constant-vus',
    //   vus: 1,
    //   duration: '10s',
    //   gracefulStop: '0s',
    // },
    'one-iteration-per-vus': {
      executor: 'per-vu-iterations',
      vus: 100,
      iterations: 1,
      maxDuration: '1m',
      gracefulStop: '0s',
    },
    // 'load-test': {
    //   executor: 'ramping-vus',
    //   stages: [
    //     { duration: '1m', target: 50 }, //normal load
    //     { duration: '2m', target: 50 },
    //     { duration: '1m', target: 200 }, //peak hours
    //     { duration: '5m', target: 200 }, //steady
    //     { duration: '1m', target: 50 }, // peak hours end
    //     { duration: '2m', target: 50 },
    //     { duration: '1m', target: 0 }, //ramp down to 0 users
    //   ],
    //   gracefulStop: '0s',
    // },
  },
  thresholds: {
    'http_req_failed{api_tag: verify-token}': [{ threshold: 'rate == 0' }],
    'http_req_failed{api_tag: features}': [{ threshold: 'rate == 0' }],
    'http_req_failed{api_tag: states}': [{ threshold: 'rate == 0' }],
    'http_req_failed{api_tag: available-job}': [{ threshold: 'rate == 0' }],
    'http_req_failed{api_tag: applied-job}': [{ threshold: 'rate == 0' }],
    'http_req_failed{api_tag: location}': [{ threshold: 'rate == 0' }],
    'http_req_duration{api_tag: verify-token}': ['p(100) <= 3000'],
    'http_req_duration{api_tag: features}': ['p(100) <= 3000'],
    'http_req_duration{api_tag: states}': ['p(100) <= 3000'],
    'http_req_duration{api_tag: available-job}': ['p(100) <= 3000'],
    'http_req_duration{api_tag: applied-job}': ['p(100) <= 3000'],
    'http_req_duration{api_tag: location}': ['p(100) <= 3000'],
    //stage 0
    // 'http_req_failed{api_tag: verify-token, stage: 0}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: features, stage: 0}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: states, stage: 0}': [{ threshold: 'rate == 0' }],
    // 'http_req_failed{api_tag: available-job, stage: 0}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: applied-job, stage: 0}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: location, stage: 0}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_duration{api_tag: verify-token, stage: 0}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: features, stage: 0}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: states, stage: 0}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: available-job, stage: 0}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: applied-job, stage: 0}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: location, stage: 0}': ['p(100) <= 3000'],
    // //stage 1
    // 'http_req_failed{api_tag: verify-token, stage: 1}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: features, stage: 1}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: states, stage: 1}': [{ threshold: 'rate == 0' }],
    // 'http_req_failed{api_tag: available-job, stage: 1}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: applied-job, stage: 1}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: location, stage: 1}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_duration{api_tag: verify-token, stage: 1}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: features, stage: 1}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: states, stage: 1}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: available-job, stage: 1}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: applied-job, stage: 1}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: location, stage: 1}': ['p(100) <= 3000'],
    // //stage 2
    // 'http_req_failed{api_tag: verify-token, stage: 2}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: features, stage: 2}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: states, stage: 2}': [{ threshold: 'rate == 0' }],
    // 'http_req_failed{api_tag: available-job, stage: 2}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: applied-job, stage: 2}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: location, stage: 2}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_duration{api_tag: verify-token, stage: 2}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: features, stage: 2}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: states, stage: 2}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: available-job, stage: 2}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: applied-job, stage: 2}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: location, stage: 2}': ['p(100) <= 3000'],
    // //stage 3
    // 'http_req_failed{api_tag: verify-token, stage: 3}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: features, stage: 3}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: states, stage: 3}': [{ threshold: 'rate == 0' }],
    // 'http_req_failed{api_tag: available-job, stage: 3}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: applied-job, stage: 3}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: location, stage: 3}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_duration{api_tag: verify-token, stage: 3}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: features, stage: 3}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: states, stage: 3}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: available-job, stage: 3}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: applied-job, stage: 3}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: location, stage: 3}': ['p(100) <= 3000'],
    // //stage 4
    // 'http_req_failed{api_tag: verify-token, stage: 4}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: features, stage: 4}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: states, stage: 4}': [{ threshold: 'rate == 0' }],
    // 'http_req_failed{api_tag: available-job, stage: 4}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: applied-job, stage: 4}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: location, stage: 4}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_duration{api_tag: verify-token, stage: 4}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: features, stage: 4}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: states, stage: 4}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: available-job, stage: 4}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: applied-job, stage: 4}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: location, stage: 4}': ['p(100) <= 3000'],
    // //stage 5
    // 'http_req_failed{api_tag: verify-token, stage: 5}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: features, stage: 5}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: states, stage: 5}': [{ threshold: 'rate == 0' }],
    // 'http_req_failed{api_tag: available-job, stage: 5}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: applied-job, stage: 5}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: location, stage: 5}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_duration{api_tag: verify-token, stage: 5}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: features, stage: 5}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: states, stage: 5}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: available-job, stage: 5}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: applied-job, stage: 5}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: location, stage: 5}': ['p(100) <= 3000'],
    // //stage 6
    // 'http_req_failed{api_tag: verify-token, stage: 6}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: features, stage: 6}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: states, stage: 6}': [{ threshold: 'rate == 0' }],
    // 'http_req_failed{api_tag: available-job, stage: 6}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: applied-job, stage: 6}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_failed{api_tag: location, stage: 6}': [
    //   { threshold: 'rate == 0' },
    // ],
    // 'http_req_duration{api_tag: verify-token, stage: 6}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: features, stage: 6}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: states, stage: 6}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: available-job, stage: 6}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: applied-job, stage: 6}': ['p(100) <= 3000'],
    // 'http_req_duration{api_tag: location, stage: 6}': ['p(100) <= 3000'],
  },
};
//setup
export const setup = () => {
  const user = signInForSetup(env.stackAccountsURL, env.credential); //get api response body after user sign in
  const { jwt } = JSON.parse(user); //user is string so it needs to parse into json obj to destructurize.
  const data = {
    env,
    jwt,
  };
  //data can be use in export functions.
  return data;
};
//main
export default function (data) {
  // get current scenario
  let scenario = exec.vu.tags['scenario'];
  if (scenario === 'load-test') tagWithCurrentStageIndex();
  group('Find tech jobs', () => {
    verifyToken(data.env.stackTalent, data.jwt);
    features(data.env.stackTalent, data.jwt);
    states(data.env.stackTalent, data.jwt, data.env.payload[0]);
    availableJobs(data);
    appliedJobs(data);
    locations(data);
  });
}
