import http from 'k6/http';
import { check, group, sleep } from 'k6';
import env from '../../environment_variables.js';
import {
  accountsNotification,
  browseContestsPage,
  chatConversation,
  contestChallenges,
  contestLanguages,
  isAccessAllowed,
  practiceContests,
  unseenIds,
  verifyToken,
} from '../../functional.js';

export let options = {
  scenarios: {
    browseContests: {
      executor: 'constant-vus',
      vus: 50,
      duration: '1m',
    },
  },
  insecureSkipTLSVerify: true,
  thresholds: {
    http_req_failed: ['rate<0.50'],
    'http_req_duration{name: "statusResponse"}': [
      { threshold: 'p(95)<1000', abortOnFail: false },
    ],
    checks: ['rate>0.95'],
    'Error Rate': ['rate<0.05'],
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

export default function joinContests(data) {
  group('Join Contests', () => {
    group('Joining Api', () => {
      isAccessAllowed(
        env.stacklab_exam.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        env.stacklab_exam.contest_id,
        data[Math.floor(Math.random() * data.length)].user.email,
        data[Math.floor(Math.random() * data.length)].user.username
      );
    });
  });
}
