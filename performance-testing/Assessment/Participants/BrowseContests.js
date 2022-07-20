import http from 'k6/http';
import { check, group, sleep } from 'k6';
import env from '../../environment_variables.js';
import {
  accountsNotification,
  browseContestsPage,
  chatConversation,
  contestChallenges,
  contestLanguages,
  practiceContests,
  unseenIds,
  verifyToken,
} from '../../functional.js';

export let options = {
  scenarios: {
    browseContests: {
      executor: 'constant-vus',
      vus: 100,
      duration: '2m',
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

export default function browseContests(data) {
  group('Browse Contests', () => {
    group('Visit page', () => {
      //Browse Contests page
      browseContestsPage(
        env.stacklab_exam.url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );
    });

    group('Browse contest api', () => {
      // Verify token
      verifyToken(
        env.accounts.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      // languages
      contestLanguages(
        env.stacklab_exam.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      //chat conversations
      chatConversation(
        env.accounts.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      //unseenIds
      unseenIds(
        env.accounts.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      // accounts notif one
      accountsNotification(
        env.accounts.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      contestChallenges(
        env.stacklab_exam.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      // practice contests
      practiceContests(
        env.stacklab_exam.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );
    });
  });
}
