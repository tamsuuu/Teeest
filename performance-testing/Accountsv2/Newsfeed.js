import http from 'k6/http';
import { check, group, sleep } from 'k6';
import env from '../environment_variables.js';
import {
  connectionApproved,
  connectionPending,
  conversationLimit15,
  newsfeedPages,
  newsfeedPosts,
  accountsNotification,
  overallStackleagueLevel,
  searchHistory,
  userProfile,
  verifyToken,
  viewProfileRequestPending,
  stackleagueNotification,
} from '../functional.js';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('Error Rate');

export let options = {
  scenarios: {
    newsFeedPage: {
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

export default function newsFeedPage(data) {
  group('Newsfeed', () => {
    group('Visit page', () => {
      newsfeedPages(
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

      // connection approved
      connectionApproved(
        env.accounts.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      // connection pending
      connectionPending(
        env.accounts.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      // view profile request pending
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

      // user_preload
      userProfile(
        env.accounts.request_url,
        data[Math.floor(Math.random() * data.length)].user.username,
        data[Math.floor(Math.random() * data.length)].jwt
      );

      // overall level stackleague from assessment
      overallStackleagueLevel(
        env.stacklab_exam.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );

      // posts
      newsfeedPosts(
        env.accounts.request_url,
        data[Math.floor(Math.random() * data.length)].jwt,
        data[Math.floor(Math.random() * data.length)].user.username
      );
    });
  });
}
