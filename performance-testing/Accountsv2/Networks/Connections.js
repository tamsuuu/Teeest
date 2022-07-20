import http from 'k6/http';
import { group } from 'k6';
import env from '../../environment_variables.js';
import {
  accountsNotification,
  connectionApproved,
  conversationLimit15,
  networkConnection,
  peopleYouMayKnow,
  searchHistory,
  stackleagueNotification,
  verifyToken,
  viewProfileRequestPending,
} from '../../functional.js';

export let options = {
  scenarios: {
    Connections: {
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

export default function Connections(data) {
  group('My Network Connections', () => {
    group('Visit page', () => {
      // Page Render
      networkConnection(
        env.accounts.url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );
    });

    group('Newsfeed apis', () => {
      // VerifyToken
      verifyToken(
        env.accounts.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      // Conversation Limit to 15
      conversationLimit15(
        env.accounts.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      // stacktrek-account notif
      accountsNotification(
        env.accounts.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      // stackleague notif
      stackleagueNotification(
        env.stackleague.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      //view profile request pending
      viewProfileRequestPending(
        env.accounts.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      // search history
      searchHistory(
        env.accounts.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      // connection approved
      connectionApproved(
        env.accounts.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      // people you may know
      peopleYouMayKnow(
        env.accounts.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );
    });
  });
}
