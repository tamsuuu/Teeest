import http from 'k6/http';
import { Rate } from 'k6/metrics';
import { check, group, sleep } from 'k6';
import env from '../../environment_variables.js';
import {
  verifyToken,
  getUserPrizes,
  specialEvents,
  networkSuggest,
  contestChallenges,
  stackleagueProfile,
  userWaitLists,
  notificationCount,
} from '../../functional.js';

export const errorRate = new Rate('Error Rate');

export let options = {
  scenarios: {
    dashboard: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '5s', target: 0 },
        { duration: '5s', target: 3 },
        { duration: '5s', target: 5 },
        { duration: '10s', target: 25 },
        { duration: '10s', target: 30 },
        { duration: '10s', target: 30 },
        { duration: '10s', target: 30 },
        { duration: '5s', target: 25 },
        { duration: '5s', target: 5 },
        { duration: '5s', target: 3 },
        { duration: '5s', target: 0 },
      ],
      exec: 'dashboard',
    },
  },
  insecureSkipTLSVerify: true,
  thresholds: {
    http_req_failed: ['rate<0.50'],
    http_req_duration: [{ threshold: 'p(95)<20000', abortOnFail: true }],
    checks: ['rate>0.90'],
    errorRate: ['rate<0.50'],
  },
};

export function setup() {
  // This is for set up process...
}

export function dashboard() {
  group('Page Renders', () => {
    const dashboardPage = http.get(
      `${env.stackleague.url}/dashboard/challenges`
    );

    check(dashboardPage, {
      'Successfully render at 1 seconds': (r) => r.timings.duration < 1000,
    });

    sleep(1);
  });

  group('API Renders', () => {
    // Check verify token
    verifyToken(env.stackleague.request_url, env.stackleague.dashboard.token);

    // Check get_user_prizes
    getUserPrizes(env.stackleague.request_url, env.stackleague.dashboard.token);

    // Check special_events
    specialEvents(env.stackleague.request_url, env.stackleague.dashboard.token);

    // Check network suggest
    networkSuggest(
      env.stackleague.request_url,
      env.stackleague.dashboard.token
    );

    // Check Contest Challenges
    contestChallenges(
      env.stackleague.request_url,
      env.stackleague.dashboard.token
    );

    // Check Stackleague profile
    stackleagueProfile(
      env.stackleague.request_url,
      env.stackleague.dashboard.token
    );

    // Check Waitlist users
    userWaitLists(
      env.stackleague.request_url,
      JSON.stringify(env.stackleague.dashboard.user_info),
      env.stackleague.dashboard.token
    );

    // Check Notification count
    notificationCount(
      env.stackleague.request_url,
      env.stackleague.dashboard.token
    );
  });
}
