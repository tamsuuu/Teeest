import { marketplaceLandingPage } from './LandingPage.js';
import env from '../../../environment_variables.js';
import { SignIn } from '../../../functional.js';

// Options of courseStudent
export let options = {
  scenarios: {
    Marketplace: {
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

export const setup = () => {
  const user = SignIn(env.accounts.url, env.credential, env.params);

  return user;
};

export default function(user) {

  const { jwt } = JSON.parse(user);

  marketplaceLandingPage(jwt);
  
}
