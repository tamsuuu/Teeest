import http from 'k6/http';
import exec from 'k6/execution';
import { check } from 'k6';
import { tagWithCurrentStageIndex } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js';

let response;

export function visitMyCourse(data) {
  const { stackEdURL } = data.env;
  response = http.get(stackEdURL, {
    tags: {
      api_tag: 'visit-mycourse',
    },
    headers: {
      'Content-Type': 'text/html',
    },
  });

  check(response, {
    'visit my courses page status is 200': (r) => r.status === 200,
  });
}

export function signIn(data) {
  let scenario = exec.vu.tags['scenario'];
  if (scenario === 'load-test-sign-in') tagWithCurrentStageIndex(); // added this one since sign in has it owns execution.
  const { stackAccountsURL, credential } = data.env;
  response = http.post(
    `${stackAccountsURL}/api/auth/login`,
    JSON.stringify(credential),
    {
      tags: {
        api_tag: 'sign-in',
      },
      timeout: '240s',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  check(response, {
    'login api status is 200': (r) => r.status === 200,
  });
}

export function unreadConversation(data) {
  const { stackEdURL } = data.env;
  response = http.get(`${stackEdURL}/api/me/unread_conversations`, {
    tags: {
      api_tag: 'unread-conversations',
    },
    headers: {
      Authorization: `Bearer ${data.jwt}`,
      'content-type': 'application/json',
    },
  });

  check(response, {
    'Unread conversation status is 200': (r) => r.status === 200,
  });
}

export function verifyToken(data) {
  const { stackAccountTest } = data.env;
  response = http.post(
    `${stackAccountTest}/api/auth/token/verify`,
    `{"token": ${JSON.stringify(data.jwt)}}`,
    {
      tags: {
        api_tag: 'verify-token',
      },
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  check(response, {
    'Verify status is 200': (r) => r.status === (200 || 201),
  });
}

export function stackedFeatures(data) {
  const { stackEdURL } = data.env;
  response = http.get(`${stackEdURL}/api/me/features`, {
    tags: {
      api_tag: 'features',
    },

    headers: {
      Authorization: `Bearer ${data.jwt}`,
      'Content-Type': 'application/json',
    },
  });

  check(response, {
    'stackedFeatures Response is 200': (r) => r.status === 200,
  });
}

export function states(data) {
  const { stackEdURL } = data.env;
  response = http.post(`${stackEdURL}/api/me/states`, {
    tags: {
      api_tag: 'states',
    },
    headers: {
      Authorization: `Bearer ${data.jwt}`,
      'Content-Type': 'application/json',
    },
  });
  check(response, {
    'state status is 201': (r) => r.status === 201,
  });
}

export function unseenIds(data) {
  const { stackAccountsURL } = data.env;
  response = http.get(
    `${stackAccountsURL}/api/chat/conversations/notifications/unseen_ids?`,
    {
      tags: {
        api_tag: 'unseenIds',
      },
      headers: {
        authorization: `Bearer ${data.jwt}`,
        'content-type': 'application/json',
      },
    }
  );
  check(response, {
    'unseen ids is 200': (r) => r.status === 200,
  });
}

export function notification(data) {
  const { stackAccountsURL } = data.env;
  response = http.get(`${stackAccountsURL}/api/notifications/page/1`, {
    tags: {
      api_tag: 'notification',
    },
    headers: {
      Authorization: `Bearer ${data.jwt}`,
      'Content-Type': 'application/json',
    },
  });

  check(response, {
    'notification first page status is 200': (r) => r.status === 200,
  });
}

export function notificationsPage(request_url, user_token, totalPages) {
  for (let count = 1; count <= totalPages; count++) {
    response = http.get(`${request_url}/api/notifications/page/${count}`, {
      headers: { Authorization: `Bearer ${user_token}` },
    });

    check(response, {
      'Get all notification is status 200': (r) => r.status === 200,
    });
  }
}

export function organizationCourse(data) {
  const { stackEdURL } = data.env;
  response = http.get(`${stackEdURL}/api/me/organizations`, {
    tags: {
      api_tag: 'organization-course',
    },
    headers: {
      Authorization: `Bearer ${data.jwt}`,
    },
  });

  check(response, {
    'Organization course status is 200': (r) => r.status === 200,
  });
}

export function invoiceOrganizationCourse(data) {
  const { stackPayURL } = data.env;
  response = http.get(`${stackPayURL}/api/me/invoices?grouped=organization`, {
    tags: {
      api_tag: 'invoice-organization',
    },
    headers: {
      Authorization: `Bearer ${data.jwt}`,
      'Content-Type': 'application/json',
    },
  });

  check(response, {
    'Invoice organization course status is 200': (r) => r.status === 200,
  });
}

export function courseLanguage(data) {
  const { stackEdURL } = data.env;
  response = http.get(`${stackEdURL}/api/course_languages?page=1`, {
    tags: {
      api_tag: 'course-language',
    },
    headers: {
      authorization: `Bearer ${data.jwt}`,
      'content-type': 'application/json',
    },
  });
  check(response, {
    'course language status is 200': (r) => r.status === 200,
  });
}

export function courseSubject(data) {
  const { stackEdURL } = data.env;
  response = http.get(`${stackEdURL}/api/course_subjects?page=1`, {
    tags: {
      api_tag: 'courseSubject',
    },
    headers: {
      authorization: `Bearer ${data.jwt}`,
      'content-type': 'application/json',
    },
  });
  check(response, {
    'course subject status is 200': (r) => r.status === 200,
  });
}

export function academyCareerCourse(data) {
  const { stackEdURL } = data.env;
  response = http.get(
    `${stackEdURL}/api/courses?type=stacktrek-academy-career&page=1&version=2`,
    {
      tags: {
        api_tag: 'academy-career',
      },
      headers: {
        authorization: `Bearer ${data.jwt}`,
        'content-type': 'application/json',
      },
    }
  );
  check(response, {
    'stacktrek academy career course status is 200': (r) => r.status === 200,
  });
}

export function academySkillCourse(data) {
  const { stackEdURL } = data.env;
  response = http.get(
    `${stackEdURL}/api/courses?type=stacktrek-academy-skill&page=1&version=2`,
    {
      tags: {
        api_tag: 'academy-skill',
      },
      headers: {
        authorization: `Bearer ${data.jwt}`,
        'content-type': 'application/json',
      },
    }
  );
  check(response, {
    'stacktrek academy skill course status is 200': (r) => r.status === 200,
  });
}

export function ongoingCourse(data) {
  tagWithCurrentStageIndex();
  const { stackEdURL } = data.env;
  response = http.get(
    `${stackEdURL}/api/me/courses?version=2&role=student&type=ongoing&page=1&category=all`,
    {
      tags: {
        api_tag: 'ongoing-course',
      },
      headers: {
        authorization: `Bearer ${data.jwt}`,
        'content-type': 'application/json',
      },
    }
  );
  check(response, {
    'ongoing course status is 200': (r) => r.status === 200,
  });
}

export function activeCourse(data) {
  const { stackEdURL } = data.env;
  response = http.get(
    `${stackEdURL}/api/me/courses?version=2&role=instructor&type=active&page=1&category=alll`,
    {
      tags: {
        api_tag: 'active-course',
      },
      headers: {
        authorization: `Bearer ${data.jwt}`,
        'content-type': 'application/json',
      },
    }
  );
  check(response, {
    'active course status is 200': (r) => r.status === 200,
  });
}

export function recommendedCourse(data) {
  const { stackEdURL } = data.env;
  response = http.get(`${stackEdURL}/api/me/recommended_courses`, {
    tags: {
      api_tag: 'recommended-course',
    },
    headers: {
      Authorization: `Bearer ${data.jwt}`,
      'Content-Type': 'application/json',
    },
  });

  check(response, {
    'recommended course status is 200': (r) => r.status === 200,
  });
}

export function checkEmail(data) {
  const { stackAccountsURL } = data.env;
  response = http.get(`${stackAccountsURL}/api/check_email/${email}`, {
    tags: {
      api_tag: 'check-email',
    },
    headers: {
      'content-type': 'application/json',
    },
  });
  if (response.body.isRegistered === true) {
  }
}

export function signUp(request_url, userData) {
  let params = JSON.stringify({
    user: {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password: 'Password@123',
      location: 'Manila, Metro Manila, Philippines',
    },
    platform_details: {
      origin: 'accounts2',
      target_path: null,
    },
  });
  response = http.post(`${request_url}/api/users`, params, {
    tags: {
      api_tag: 'sign-up',
    },
    headers: {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json; charset=UTF-8',
    },
  });

  check(response, {
    'Successfully registered user': (r) => r.status === 201,
    'User has registered': (r) => r.status === 422,
  });
}

export function viewExercise(data) {
  const { stackEdURL } = data.env;
  response = http.get(`${stackEdURL}/courses/XpV9DNNDYrwz/quizzes/1300`, {
    tags: {
      api_tag: 'view-exercise',
    },
    headers: {
      'content-type': 'text/html',
    },
  });
}

export function quizzes(data) {
  const { stackEdURL } = data.env;
  response = http.get('https://dev.edu.stacktrek.com/api/quizzes/1300', {
    tags: {
      api_tag: 'quizzes',
    },
    headers: {
      authorization: `Bearer ${data.jwt}`,
      'content-type': 'application/json',
    },
  });
  check(response, {
    'quizzes api statu 200': (r) => r.status === 200,
  });
}

export function quizSubmissions(data) {
  const { stackEdURL } = data.env;
  response = http.post(`${stackEdURL}api/quiz_submissions`, '{"quizId":1300}', {
    tags: {
      api_tag: 'quiz-submission',
    },
    headers: {
      authorization: `Bearer ${data.jwt}`,
      'content-type': 'application/json',
    },
  });
  check(response, {
    'quizz submissions api status 201': (r) => r.status === 201,
  });
}
