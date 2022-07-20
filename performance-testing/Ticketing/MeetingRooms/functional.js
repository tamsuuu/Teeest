import http from 'k6/http';
import { tagWithCurrentStageIndex } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js';
import exec from 'k6/execution';
import { check, sleep } from 'k6';

let response;

export const sessionDashboard = (data) => {
  const { stackLiveShareURL } = data.env;
  response = http.get(`${stackLiveShareURL}/sessions`, {
    tags: {
      api_tag: 'liveshare-dashboard',
    },
  });

  check(response, {
    'trainers dashboard page status is 200': (r) => r.status === 200,
  });
};

export const apiMe = (data) => {
  const { stackAccountsURL } = data.env;
  response = http.get(`${stackAccountsURL}/api/me`, {
    tags: {
      api_tag: 'me',
    },
    headers: {
      accept: 'application/json, text/plain, */*',
      authorization: `Bearer ${data.jwt}`,
    },
  });
  check(response, {
    'me status is 200': (r) => r.status === 200,
  });
};

export const meetings = (data) => {
  const { stackAccountsURL } = data.env;
  response = http.get(`${stackAccountsURL}/api/meetings`, {
    tags: {
      api_tag: 'meetings',
    },
    headers: {
      accept: 'application/json, text/plain, */*',
      authorization: `Bearer ${data.jwt}`,
    },
  });
  check(response, {
    'meetings status is 200': (r) => r.status === 200,
  });
};

export const unseenIds = (data) => {
  const { stackAccountsURL } = data.env;
  response = http.get(
    `${stackAccountsURL}/api/chat/conversations/notifications/unseen_ids?`,
    {
      tags: {
        api_tag: 'unseen-id',
      },
      headers: {
        authorization: `Bearer ${data.jwt}`,
        'content-type': 'application/json',
      },
    }
  );
  check(response, {
    'unseen ids status is 200': (r) => r.status === 200,
  });
};

export const notification = (data) => {
  const { stackAccountsURL } = data.env;
  response = http.get(`${stackAccountsURL}/api/notifications/page/1`, {
    tags: {
      api_tag: 'notifications',
    },
    headers: {
      authorization: `Bearer ${data.jwt}`,
    },
  });

  check(response, {
    'notification status is 200': (r) => r.status === 200,
  });
};

export const endSession = (data) => {
  const { stackAccountsURL } = data.env;
  response = http.patch(`${stackAccountsURL}/api/meetings/${meetingId}/end`, {
    tags: {
      api_tag: 'end-session',
    },
    headers: {
      accept: 'application/json, text/plain, */*',
      authorization: `Bearer ${data.jwt}`,
    },
  });

  check(response, {
    'end session status is 200': (r) => r.status == 200,
  });
};

export const feedback = (data) => {
  const { stackAccountsURL, identifier } = data.env;
  response = http.post(
    `${stackAccountsURL}/api/meetings/${identifier}/feedbacks`,
    '{"meeting_room_feedback":{"meeting_room_trainer_id":565,"rating":3,"body":"Great"}}',
    {
      tags: {
        api_tag: 'feedback',
      },
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${data.jwt}`,
        'content-type': 'application/json',
      },
    }
  );
};

export const playgroundPage = (data) => {
  const { stackLiveShareURL } = data.env;
  response = http.get(`${stackLiveShareURL}`, {
    tags: {
      api_tag: 'playground',
    },
  });
};

export const codeTemplate = (data) => {
  const { stackLiveShareURL } = data.env;
  response = http.get(`${stackLiveShareURL}/api/codeTemplates`, {
    tags: {
      api_tag: 'code-template',
    },
    headers: {
      accept: 'application/json, text/plain, */*',
    },
  });
  check(response, {
    'code template status is 200': (r) => r.status == 200,
  });
  console.log(`current user is ${__VU} execute ${__ITER}`);
};

export const executeCode = (data) => {
  let scenario = exec.vu.tags['scenario'];
  if (scenario === 'ramp-up-50') tagWithCurrentStageIndex();
  const { stackLab } = data.env;
  response = http.post(
    `${stackLab}/api/code_runner/execute_code`,
    '{"solution":"print(\\"Hello world!!!\\")","language":"Python","inputs":[""]}',
    {
      tags: {
        api_tag: 'execute-code',
      },
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${data.jwt}`,
        'content-type': 'application/json',
      },
    }
  );
  check(response, {
    'execute code status is 200': (r) => r.status == 200,
  });

  console.log(`current user is ${__VU}`);
};
