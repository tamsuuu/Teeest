import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('Error Rate');

export function unreadConversation(request_url, user_token, username) {
  const request = http.get(`${request_url}/api/me/unread_conversations`, {
    tags: {
      api_tag: 'unread-conversation',
    },
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log(`Unread Conversation for ${username} is ${request.status}`);

  const result = check(request, {
    'unreadConversation Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function stackedFeatures(request_url, user_token, username) {
  const request = http.get(`${request_url}/api/me/features`, {
    tags: {
      api_tag: 'stacked-features',
    },
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log(`Stacked Features for ${username} is ${request.status}`);

  const result = check(request, {
    'stackedFeatures Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function stackleagueNotification(request_url, user_token, username) {
  const res = http.get(`${request_url}/api/notifications/`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log(`Stackleague notification for ${username} --> ${res.status}`);

  const result = check(res, {
    'Stackleague notification response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function stackedCourse(request_url, user_token, course_key, username) {
  const request = http.get(
    `${request_url}/api/courses_by_course_key/${course_key}`,
    {
      tags: {
        api_tag: 'course-by-key',
      },
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(`Course by key for ${username} is ${request.status}`);

  const result = check(request, {
    'stackedCourse Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function courseProgress(request_url, user_token, course_id, username) {
  const courseProgress = http.get(
    `${request_url}/api/courses/${course_id}/progresses`,
    {
      tags: {
        api_tag: 'course-progress',
      },
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(`Course progress for ${username} is ${request.status}`);

  const result = check(courseProgress, {
    'courseProgress Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function courseModules(request_url, user_token, course_id, username) {
  const courseModules = http.get(
    `${request_url}/api/courses/${course_id}/modules`,
    {
      tags: {
        api_tag: 'course-modules',
      },
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(`Course modules for ${username} is ${request.status}`);

  const result = check(courseModules, {
    'courseModules Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function purchaseType(request_url, user_token, course_id, username) {
  const request = http.get(
    `${request_url}/api/course_purchase_slots/${course_id}/user_type`,
    {
      tags: {
        api_tag: 'purchase-type',
      },
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(`Purchase Type for ${username} is ${request.status}`);

  const result = check(request, {
    'purchaseType Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function certificateDownload(request_url, user_token, course_id) {
  const certificateDownload = http.get(
    `${request_url}/api/courses/${course_id}/certificate/can_download`,
    {
      headers: { Authorization: `Bearer ${user_token}` },
    }
  );

  const certificateDownloadResponse = check(certificateDownload, {
    'certificateDownload Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!certificateDownloadResponse);
}

export function studentClasses(request_url, user_token, course_id, username) {
  const request = http.get(
    `${request_url}/api/me/courses/${course_id}/classes?role=student`,
    {
      tags: {
        api_tag: 'student-classes',
      },
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(`Student Clasess for ${username} is ${request.status}`);

  const result = check(request, {
    'StudentClasses response must 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function studentGrades(request_url, user_token, class_id) {
  const request = http.get(
    `${request_url}/api/me/classes/${class_id}/grade_book`,
    {
      tags: {
        api_tag: 'student-grades',
      },
      headers: { Authorization: `Bearer ${user_token}` },
      'Content-Type': 'application/json',
    }
  );

  const result = check(request, {
    'studentGrades response must 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function courseStudentFiles(
  request_url,
  user_token,
  course_id,
  username
) {
  const request = http.get(
    `${request_url}/api/courses/${course_id}/files?view=student`,
    {
      tags: {
        api_tag: 'course-student-files',
      },
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(`Course Student Files for ${username} is ${request.status}`);

  const result = check(request, {
    'courseStudentFiles response must 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function courseStudentQuiz(
  request_url,
  user_token,
  course_id,
  username
) {
  const request = http.get(
    `${request_url}/api/courses/${course_id}/quizzes?role=student`,
    {
      tags: {
        api_tag: 'course-student-quiz',
      },
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(`Course Student Quiz for ${username} is ${request.status}`);

  const result = check(request, {
    'courseStudentQuiz response must 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

// -------------------------- StackLeague API
export function verifyToken(request_url, user_token, username) {
  const request = http.post(
    `${request_url}/api/auth/token/verify`,
    `{"token":"${user_token}"}`,
    {
      headers: {
        accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      tags: {
        api_tag: 'verify-token',
      },
    }
  );

  console.log(`Verify token for ${username} is ${request.status}`);

  let result = check(request, {
    'Verify response is 200 or 201': (r) => r.status === (200 || 201),
    'Verify if the login user has the same jwt token': (r) =>
      r.json('jwt') === user_token,
  });

  errorRate.add(!result);
}

export function getUserPrizes(request_url, user_token) {
  const getUserPrizes = http.get(`${request_url}/api/get_user_prizes`, {
    headers: { Authorization: `Bearer ${user_token}` },
  });

  check(getUserPrizes, {
    'User Prizes Response is 200': (r) => r.status === 200,
  });
  errorRate.add(!getUserPrizes);
}

export function specialEvents(request_url, user_token) {
  const specialEvents = http.get(`${request_url}/api/special_events`, {
    headers: { Authorization: `Bearer ${user_token}` },
  });

  check(specialEvents, {
    'Special Events Response is 200': (r) => r.status === 200,
  });
  errorRate.add(!specialEvents);
}

export function networkSuggest(request_url, user_token) {
  const networkSuggest = http.get(`${request_url}/api/connections/suggest`, {
    headers: { Authorization: `Bearer ${user_token}` },
  });

  check(networkSuggest, {
    'Network Suggest Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!networkSuggest);
}

export function contestChallenges(request_url, user_token, username) {
  const request = http.get(`${request_url}/api/contest`, {
    headers: { Authorization: `Bearer ${user_token}` },
  });

  console.log(`Contest challenges for ${username} is ${request.status}`);

  const result = check(request, {
    'Stackleague Challenges Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function userWaitLists(request_url, body_payload, user_token) {
  const userWaitLists = http.post(`${request_url}/api/waitlist`, body_payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user_token}`,
    },
  });

  check(userWaitLists, {
    'User Wait List Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!userWaitLists);
}

export function notificationCount(request_url, user_token) {
  const notificationCount = http.get(
    `${request_url}/api/notifications/unread/count`,
    {
      headers: { Authorization: `Bearer ${user_token}` },
    }
  );

  check(notificationCount, {
    'Notification Count Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!notificationCount);
}

export function topTenOverAllRankings(request_url, start_date) {
  let startDateISO = start_date;
  const topTenOverAllRankings = http.get(
    `${request_url}/api/rankings?limit=10&start=${startDateISO}`
  );

  const topTenOverAllRankingResponse = check(topTenOverAllRankings, {
    '1. Top 10 Overall Rankings Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!topTenOverAllRankingResponse);
}

export function topTenWeeklyRanking(request_url, start_date, end_date) {
  const topTenWeeklyRanking = http.get(
    `${request_url}/api/rankings?start=${start_date}&end=${end_date}&limit=10`
  );

  const topTenWeelyRankingResponse = check(topTenWeeklyRanking, {
    '2. Top 10 Weekly Rankings Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!topTenWeelyRankingResponse);
}

export function topTenOverAllTeamRankings(request_url, start_date) {
  let startDateISO = start_date;
  const topTenOverallRanking = http.get(
    `${request_url}/api/rankings/team?start=${startDateISO}&limit=10`
  );

  const topTenOverallRankingResponse = check(topTenOverallRanking, {
    '3. Top 10 Overall Team Rankings Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!topTenOverallRankingResponse);
}

export function topTenWeeklyTeamRankings(request_url, start_date, end_date) {
  const topTenTeamWeeklyRanking = http.get(
    `${request_url}/api/rankings/team?start=${start_date}&end=${end_date}&limit=10`
  );

  const topTenWeelyTeamRankingResponse = check(topTenTeamWeeklyRanking, {
    '4. Top 10 Weekly Team Rankings Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!topTenWeelyTeamRankingResponse);
}

export function topFiftyOverAllRankings(request_url, start_date) {
  let startDateISO = start_date;
  const topFiftyOverAllRankings = http.get(
    `${request_url}/api/rankings?limit=50&start=${startDateISO}`
  );

  const topFiftyOverAllRankingResponse = check(topFiftyOverAllRankings, {
    '1. Top 50 Overall Rankings Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!topFiftyOverAllRankingResponse);
}

export function topFiftyWeeklyRanking(request_url, start_date, end_date) {
  const topFiftyWeeklyRanking = http.get(
    `${request_url}/api/rankings?start=${start_date}&end=${end_date}&limit=50`
  );

  const topFiftyWeeklyRankingResponse = check(topFiftyWeeklyRanking, {
    '2. Top 10 Weekly Rankings Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!topFiftyWeeklyRankingResponse);
}

export function topFiftyOverAllTeamRankings(request_url, start_date) {
  let startDateISO = start_date;
  const topFiftyOverAllTeamRankings = http.get(
    `${request_url}/api/rankings/team?start=${startDateISO}&limit=50`
  );

  const topFiftyTeamRankingResponse = check(topFiftyOverAllTeamRankings, {
    '3. Top 50 Overall Team Rankings Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!topFiftyTeamRankingResponse);
}

export function topFiftyWeeklyTeamRankings(request_url, start_date, end_date) {
  const topFiftyWeeklyTeamRankings = http.get(
    `${request_url}/api/rankings/team?start=${start_date}&end=${end_date}&limit=50`
  );

  const topFiftyWeeklyTeamRankingResponse = check(topFiftyWeeklyTeamRankings, {
    '4. Top 50 Weekly Team Rankings Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!topFiftyWeeklyTeamRankingResponse);
}

// --------------------------- sample

export function organization(request_url, user_token) {
  const organization = http.get(
    `${request_url}/api/public/courses?type=stacktrek-academy-skill&page=1&version=2&marketType=free`,
    {
      headers: { Authorization: `Bearer ${user_token}` },
    }
  );

  const organizationResponse = check(organization, {
    'Organization Response is 200': (r) => r.status === 200,
  });

  const organizationDuration = check(organization, {
    'Organizaton Duration is less than 1 seconds': (r) =>
      r.timings.duration <= 1000,
  });

  errorRate.add(!organizationResponse);
  errorRate.add(!organizationDuration);
}

export function courseLanguage(request_url, user_token) {
  const courseLanguage = http.get(
    `${request_url}/api/course_languages?page=1`,
    {
      headers: { Authorization: `Bearer ${user_token}` },
    }
  );

  const courseLanguageResponse = check(courseLanguage, {
    'Course Language Response is 200': (r) => r.status === 200,
  });

  const courseLanguageDuration = check(courseLanguage, {
    'Course Language Duration is less than 1 seconds': (r) =>
      r.timings.duration <= 1000,
  });

  errorRate.add(!courseLanguageResponse);
  errorRate.add(!courseLanguageDuration);
}

export function courseSubject(request_url, user_token) {
  const courseSubject = http.get(`${request_url}/api/course_subjects?page=1`, {
    headers: { Authorization: `Bearer ${user_token}` },
  });

  const courseSubjectResponse = check(courseSubject, {
    'Course Subject Response is 200': (r) => r.status === 200,
  });

  const courseSubjectDuration = check(courseSubject, {
    'Course Subject Duration is less than 1 seconds': (r) =>
      r.timings.duration <= 1000,
  });

  errorRate.add(!courseSubjectResponse);
  errorRate.add(!courseSubjectDuration);
}

export function stacktrekAcademyCareer(request_url, user_token) {
  const stacktrekAcademyCareer = http.get(
    `${request_url}/api/courses?type=stacktrek-academy-career&page=1&version=2`,
    {
      headers: { Authorization: `Bearer ${user_token}` },
    }
  );

  const stacktrekAcademyCareerResponse = check(stacktrekAcademyCareer, {
    'Stacktrek Academy Career Response is 200': (r) => r.status === 200,
  });

  const stacktrekAcademyCareerDuration = check(stacktrekAcademyCareer, {
    'Stacktrek Academy Career Duration is less than 1 seconds': (r) =>
      r.timings.duration <= 1000,
  });

  errorRate.add(!stacktrekAcademyCareerResponse);
  errorRate.add(!stacktrekAcademyCareerDuration);
}

export function stacktrekAcademySkill(request_url, user_token) {
  const stacktrekAcademySkill = http.get(
    `${request_url}/api/courses?type=stacktrek-academy-skill&page=1&version=2`,
    {
      headers: { Authorization: `Bearer ${user_token}` },
    }
  );

  const stacktrekAcademySkillResponse = check(stacktrekAcademySkill, {
    'Stacktrek Academy Skill Response is 200': (r) => r.status === 200,
  });

  const stacktrekAcademySkillDuration = check(stacktrekAcademySkill, {
    'Stacktrek Academy Skill Duration is less than 1 seconds': (r) =>
      r.timings.duration <= 1000,
  });

  errorRate.add(!stacktrekAcademySkillResponse);
  errorRate.add(!stacktrekAcademySkillDuration);
}

export function stacktrekAcademySkillFree(request_url, user_token) {
  const stacktrekAcademySkillFree = http.get(
    `${request_url}/api/courses?type=stacktrek-academy-skill&page=1&version=2&marketType=free`,
    {
      headers: { Authorization: `Bearer ${user_token}` },
    }
  );

  const stacktrekAcademySkillFreeResponse = check(stacktrekAcademySkillFree, {
    'Stacktrek Academy Skill Free Response is 200': (r) => r.status === 200,
  });

  const stacktrekAcademySkillFreeDuration = check(stacktrekAcademySkillFree, {
    'Stacktrek Academy Skill Free Duration is less than 1 seconds': (r) =>
      r.timings.duration <= 1000,
  });

  errorRate.add(!stacktrekAcademySkillFreeResponse);
  errorRate.add(!stacktrekAcademySkillFreeDuration);
}

export function stacktrekAcademyFree(request_url, user_token) {
  const stacktrekAcademyFree = http.get(
    `${request_url}/api/courses?type=stacktrek-academy-free&view=student&page=1`,
    {
      headers: { Authorization: `Bearer ${user_token}` },
    }
  );

  const stacktrekAcademyFreeResponse = check(stacktrekAcademyFree, {
    'Stacktrek Academy Free Response is 200': (r) => r.status === 200,
  });

  const stacktrekAcademyFreeDuration = check(stacktrekAcademyFree, {
    'Stacktrek Academy Free Duration is less than 1 seconds': (r) =>
      r.timings.duration <= 1000,
  });

  errorRate.add(!stacktrekAcademyFreeResponse);
  errorRate.add(!stacktrekAcademyFreeDuration);
}

export function stacktrekAcademyForSchools(request_url, user_token) {
  const stacktrekAcademyForSchools = http.get(
    `${request_url}/api/courses?type=stacktrek-academy-for-schools&page=1&yearLevel=year%201`,
    {
      headers: { Authorization: `Bearer ${user_token}` },
    }
  );

  const stacktrekAcademyForSchoolsResponse = check(stacktrekAcademyForSchools, {
    'Stacktrek Academy For Schools Response is 200': (r) => r.status === 200,
  });

  const stacktrekAcademyForSchoolsDuration = check(stacktrekAcademyForSchools, {
    'Stacktrek Academy For Schools Duration is less than 1 seconds': (r) =>
      r.timings.duration <= 1000,
  });

  errorRate.add(!stacktrekAcademyForSchoolsResponse);
  errorRate.add(!stacktrekAcademyForSchoolsDuration);
}

export function userLevel(request_url, user_token) {
  const userLevel = http.get(`${request_url}/api/me/stackleague/level`, {
    headers: { Authorization: `Bearer ${user_token}` },
  });

  const userLevelResponse = check(userLevel, {
    'User level Response is 200': (r) => r.status === 200,
  });

  const userLevelDuration = check(userLevel, {
    'User level Duration is less than 1 seconds': (r) =>
      r.timings.duration <= 1000,
  });

  errorRate.add(!userLevelResponse);
  errorRate.add(!userLevelDuration);
}

export function stackleagueCourse(request_url, user_token) {
  const stackleagueCourse = http.get(
    `${request_url}/api/courses?type=stackleague&page=1&view=student`,
    {
      headers: { Authorization: `Bearer ${user_token}` },
    }
  );

  const stackleagueCourseResponse = check(stackleagueCourse, {
    'Stackleague Course Response is 200': (r) => r.status === 200,
  });

  const stackleagueCourseDuration = check(stackleagueCourse, {
    'Stackleague Course Duration is less than 1 seconds': (r) =>
      r.timings.duration <= 1000,
  });

  errorRate.add(!stackleagueCourseResponse);
  errorRate.add(!stackleagueCourseDuration);
}

export function publicFreeCourse(request_url, user_token) {
  const publicFreeCourse = http.get(
    `${request_url}/api/courses?type=public-free&page=1&version=2`,
    {
      headers: { Authorization: `Bearer ${user_token}` },
    }
  );

  const publicFreeCourseResponse = check(publicFreeCourse, {
    'Public Free Course Response is 200': (r) => r.status === 200,
  });

  const publicFreeCourseDuration = check(publicFreeCourse, {
    'Public Free Course Duration is less than 1 seconds': (r) =>
      r.timings.duration <= 1000,
  });

  errorRate.add(!publicFreeCourseResponse);
  errorRate.add(!publicFreeCourseDuration);
}

export function stacktrekAcademySkillFreeNoAuth(request_url) {
  const stacktrekAcademySkillFree = http.get(
    `${request_url}/api/public/courses?type=stacktrek-academy-skill&page=1&version=2&marketType=free`
  );

  const stacktrekAcademySkillFreeResponse = check(stacktrekAcademySkillFree, {
    'Stacktrek Academy Skills Free Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!stacktrekAcademySkillFreeResponse);
}

export function stacktrekAcademyFreeNoAuth(request_url) {
  const stacktrekAcademyFree = http.get(
    `${request_url}/api/public/courses?type=stacktrek-academy-free&page=1`
  );

  const stacktrekAcademyFreeResponse = check(stacktrekAcademyFree, {
    'Stacktrek Academy Free Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!stacktrekAcademyFreeResponse);
}

export function stacktrekAcademySchoolYearOneNoAuth(request_url) {
  const stacktrekAcademySchoolYearOne = http.get(
    `${request_url}/api/public/courses?type=stacktrek-academy-for-schools&page=1&yearLevel=year%201`
  );

  const stacktrekAcademySchoolYearOneResponse = check(
    stacktrekAcademySchoolYearOne,
    {
      'Stacktrek Academy Free Response is 200': (r) => r.status === 200,
    }
  );

  errorRate.add(!stacktrekAcademySchoolYearOneResponse);
}

export function stackleagueCourseNoAuth(request_url) {
  const stackleagueCourse = http.get(
    `${request_url}/api/public/courses?type=stackleague&page=1`
  );

  const stackleagueCourseResponse = check(stackleagueCourse, {
    'Stacktrek Academy Free Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!stackleagueCourseResponse);
}

export function publicCourseFreeNoAuth(request_url) {
  const publicCourseFree = http.get(
    `${request_url}/api/public/courses?type=public-free&page=1&version=2`
  );

  const publicCourseFreeResponse = check(publicCourseFree, {
    'Stacktrek Academy Free Response is 200': (r) => r.status === 200,
  });

  errorRate.add(!publicCourseFreeResponse);
}

export function organizationCourse(request_url, user_token) {
  const res = http.get(`${request_url}/api/me/organizations`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });

  const result = check(res, {
    'Organization course status is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function invoiceOrganizationCourse(request_url, user_token) {
  const res = http.get(`${request_url}/api/me/invoices?grouped=organization`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  const result = check(res, {
    'Invoice organization course status is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function recommendedCourse(request_url, user_token) {
  const res = http.get(`${request_url}/api/me/recommended_courses`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  const result = check(res, {
    'recommended course status is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function chatConversation(request_url, user_token) {
  const res = http.get(`${request_url}/api/chat/conversations?`, {
    headers: {
      tags: {
        api_tag: 'chat-conversation',
      },
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  let result = check(res, {
    'Chat Conversation response status is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

// Enrolling of Course from marketplace
export function enrollCourse(request_url, payload, user_token, username) {
  let payloadStringify = JSON.stringify(payload);

  let request = http.put(
    `${request_url}/api/course_purchases`,
    payloadStringify,
    {
      headers: {
        authorization: `Bearer ${user_token}`,
        'content-type': 'application/json',
      },
    }
  );

  console.log(`Enroll request for ${username} is ${request.status}`);

  if (request.status === 201) {
    check(request, {
      'Enroll Page was successfully': (r) => r.status === 201,
    });
  } else if (request.status === 403) {
    check(request, {
      'Some Student Already Enrolled': (r) => r.status === 403,
    });
    console.log('User Already enrolled');
  } else {
    let result = check(request, {
      'Enroll Page was successfully': (r) => r.status === 200,
    });
    errorRate.add(!result);
  }
}

// Viewing of course api from marketplace
export function marketplaceViewCourse(
  request_url,
  courseKey,
  user_token,
  username
) {
  let request = http.get(
    `${request_url}/api/courses_by_course_key/${courseKey}?type=marketplace`,
    {
      headers: {
        tags: {
          api_tag: 'verify-token',
        },
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(`viewCourseMarketplace for ${username} is ${request.status}`);

  let result = check(request, {
    'Visit Course is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

// Most used language
export function mostUsedLanguage(request_url, user_id, user_token, username) {
  let request = http.get(
    `${request_url}/api/user/${user_id}/most_used_languages`,
    {
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(`Most used language for ${username} is ${request.status}`);

  let result = check(request, {
    'Most used language response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function userProfile(request_url, username, user_token) {
  let request = http.get(
    `${request_url}/api/users/${username}?preload_data%5B%5D=school&preload_data%5B%5D=user_employments&preload_data%5B%5D=user_educations&preload_data%5B%5D=user_certifications&preload_data%5B%5D=user_portfolios&preload_data%5B%5D=user_coding_languages&preload_data%5B%5D=organizations&preload_data%5B%5D=pending_organizations&preload_data%5B%5D=view_profile_requests&preload_data%5B%5D=user_info_media&preload_data%5B%5D=addressee_user_connections&preload_data%5B%5D=requester_user_connections`,
    {
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(`Overall Level Stackleague for ${username} is ${request.status}`);

  let result = check(request, {
    'User Profile response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function overallStackleagueStatistics(
  request_url,
  user_token,
  username
) {
  let request = http.get(
    `${request_url}/api/overall_statistics?contest_type=stackleague`,
    {
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(
    `Overall stackleague statistics for ${username} is ${request.status}`
  );

  let result = check(request, {
    'Overall stackleague statistics response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function myLearnings(request_url, user_token, username) {
  let request = http.get(`${request_url}/api/me/learnings`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log(`My Learnings for ${username} is ${request.status}`);

  let result = check(request, {
    'My Learnings response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function myPosts(request_url, user_token, username) {
  let request = http.get(
    `${request_url}/api2/user-posts?userId=126&$sort%5BcreatedAt%5D=-1`,
    {
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(`My User Posts for ${username} is ${request.status}`);

  let result = check(request, {
    'My user posts response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function overallStackleagueLevel(request_url, user_token, username) {
  let request = http.get(
    `${request_url}/api/user/overall_level?type=stackleague`,
    {
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(`Overall stackleague level for ${username} is ${request.status}`);

  let result = check(request, {
    'Overall stackleague level response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function myCompletedCoursesPaginate(
  request_url,
  user_id,
  user_token,
  username
) {
  let request = http.get(
    `${request_url}/api/users/${user_id}/courses?role=student&type=finished&page=1`,
    {
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(`My completed courses for ${username} is ${request.status}`);

  let result = check(request, {
    'My completed courses response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function viewProfileRequestPending(request_url, user_token, username) {
  let request = http.get(
    `${request_url}/api/view_profile_requests?status=PENDING`,
    {
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(
    `View profile request pending for ${username} is ${request.status}`
  );

  let result = check(request, {
    'View profile request pending response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function searchHistory(request_url, user_token, username) {
  let request = http.get(`${request_url}/api/search_history`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log(`Search history for ${username} is ${request.status}`);

  let result = check(request, {
    'Search history response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function conversationLimit15(request_url, user_token, username) {
  let request = http.get(
    `${request_url}/api/chat/conversations?offset=0&limit=15`,
    {
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(`Conversation limit 15 for ${username} is ${request.status}`);

  let result = check(request, {
    'Conversation limit 15 response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function accountsNotification(request_url, user_token, username) {
  let request = http.get(`${request_url}/api/notifications/page/1`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log(`Accounts notification for ${username} is ${request.status}`);

  let result = check(request, {
    'Accounts notification response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function myProfilePage(page_url, user_token, username) {
  let request = http.get(`${page_url}/profile`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log(`My Profile renders for ${username} is ${request.status}`);

  let result = check(request, {
    'My Profile rendering response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
  sleep(1);
}

export function stackleagueProfile(request_url, user_id, user_token, username) {
  let request = http.get(`${request_url}/api/profile/${user_id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log(`Stackleague profile for ${username} is ${request.status}`);

  let result = check(request, {
    'Stackleague profile response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function newsfeedPages(page_url, user_token, username) {
  let request = http.get(`${page_url}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log(`Newsfeed pages render for ${username} is ${request.status}`);

  let result = check(request, {
    'Newsfeed rendering response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
  sleep(1);
}

export function connectionApproved(request_url, user_token, username) {
  let request = http.get(`${request_url}/api/connections?status=APPROVED`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log(`Connection Approved for ${username} is ${request.status}`);

  let result = check(request, {
    'Connection approved response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function connectionPending(request_url, user_token, username) {
  let request = http.get(`${request_url}/api/connections?status=PENDING`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log(`Connection pending for ${username} is ${request.status}`);

  let result = check(request, {
    'Connection pending response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function newsfeedPosts(request_url, user_token, username) {
  let request = http.get(`${request_url}/api2/posts`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log(`Newsfeed posts for ${username} is ${request.status}`);

  let result = check(request, {
    'Newsfeed posts response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function networkConnection(page_url, user_token, username) {
  let request = http.get(`${page_url}/network?tab=connections`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log(
    `Network Connections response for ${username} is ${request.status}`
  );

  let result = check(request, {
    'Network connection response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
  sleep(1);
}

export function peopleYouMayKnow(request_url, user_token, username) {
  let request = http.get(
    `${request_url}/api/connections/people_you_may_know?limit=6&except=`,
    {
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(
    `People you may know response for ${username} is ${request.status}`
  );

  let result = check(request, {
    'People you may know response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function browseContestsPage(page_url, user_token, username) {
  let request = http.get(`${page_url}/all`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log(
    `Browse assessment contests pages render for ${username} is ${request.status}`
  );

  let result = check(request, {
    'Browse contests rendering response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
  sleep(1);
}

export function contestLanguages(request_url, user_token, username) {
  let request = http.get(`${request_url}/api/languages`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log(
    `Contest languages response for ${username} is ${request.status}`
  );

  let result = check(request, {
    'Contest languages api response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function unseenIds(request_url, user_token, username) {
  let request = http.get(
    `${request_url}/api/chat/conversations/notifications/unseen_ids?`,
    {
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(`Unseen Id's response for ${username} is ${request.status}`);

  let result = check(request, {
    'Unseen ids api response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function practiceContests(request_url, user_token, username) {
  let request = http.get(`${request_url}/api/practice_contests`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log(
    `Practice contests response for ${username} is ${request.status}`
  );

  let result = check(request, {
    'Practice contests api response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);
}

export function isAccessAllowed(
  request_url,
  user_token,
  contest_id,
  email,
  username
) {
  let request = http.get(
    `${request_url}/api/contest/${contest_id}/is_allowed_access/${email}`,
    {
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(
    `Check if email allowed response for ${username} is ${request.status}`
  );

  let result = check(request, {
    'Practice contests api response is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);

  if (result) {
    let request2 = http.post(
      `${request_url}/api/contest/${contest_id}/join`,
      '{"password":"12345"}',
      {
        headers: {
          Authorization: `Bearer ${user_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`Join requests response for ${username} is ${request2.status}`);

    let result2 = check(request2, {
      'Join Successfully': (r) => r.status === 201,
    });

    errorRate.add(!result2);
  } else {
    console.log(`Email is not allowed to take the assessment...`);
  }
  sleep(5);
}
