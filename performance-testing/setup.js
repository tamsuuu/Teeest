import http from 'k6/http';
import { Rate } from 'k6/metrics';
import { check } from 'k6';

const errorRate = new Rate('Error Rate');

export function getStudentAllOngoingCoursesSetup(jwt) {
  const res = http.get(
    `${env.stackEdURL}/api/me/courses?version=2&role=student&type=ongoing&page=99&category=all`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const { total } = JSON.parse(res.body);
  console.log(total);

  return total;
}

export function signInForSetup(request_url, credentials) {
  const res = http.post(
    `${request_url}/api/auth/login`,
    JSON.stringify(credentials),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const result = check(res, {
    'User sign in successfully': (r) => r.status === 200,
  });

  if (result) return res.body; // return respond.body as string
}

export function getNotifFirstPage(request_url, user_token) {
  const res = http.get(`${request_url}/api/notifications/`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  const result = check(res, {
    'notification first page status is 200': (r) => r.status === 200,
  });
  const totalPages = Math.ceil(res.json('data').notifications.length / 10); // get numbers of pages divisible by 10 and ceil into highest number

  errorRate.add(!result);
  return totalPages;
}

export const createSession = (request_url, user_token, create_room) => {
  const response = http.post(`${request_url}/api/meetings`, create_room, {
    tags: {
      api_tag: 'create-session',
    },
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });
  const result = check(response, {
    'create session status is 201': (r) => r.status === 201,
  });
  if (result) return response.body;
};
