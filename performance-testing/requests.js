import { credentials, authorization } from './environment_variables.js';

export const stackedRequests = {
  pages: {
    classes: {
      url: `${credentials.StackedBaseURL}courses/${credentials.testCourseKey}/classes`,
      params: authorization,
    },
    lessons: {
      url: `${credentials.StackedBaseURL}courses/${credentials.testCourseKey}/lessons`,
      params: authorization,
    },
    gradebook: {
      url: `${credentials.StackedBaseURL}courses/${credentials.testCourseKey}/grade-book`,
      params: authorization,
    },
    materials: {
      url: `${credentials.StackedBaseURL}courses/${credentials.testCourseKey}/materials`,
      params: authorization,
    },
    people: {
      url: `${credentials.StackedBaseURL}courses/${credentials.testCourseKey}/people/v2`,
      params: authorization,
    },
    discussion: {
      url: `${credentials.StackedBaseURL}courses/${credentials.testCourseKey}/discussions`,
      params: authorization,
    },
    shareCourse: {
      url: `${credentials.StackedBaseURL}courses/${credentials.testCourseKey}/shares`,
      params: authorization,
    },
    settings: {
      url: `${credentials.StackedBaseURL}courses/${credentials.testCourseKey}/settings`,
      params: authorization,
    },
  },
  api: {
    classes: {
      method: 'GET',
      url: `${credentials.StackedBaseURL}api/courses/${credentials.testCourseId}/classes`,
      params: authorization,
    },
    modules: {
      method: 'GET',
      url: `${credentials.StackedBaseURL}api/courses/${credentials.testCourseId}/modules`,
      params: authorization,
    },
    gradebook: {
      method: 'GET',
      url: `${credentials.StackedBaseURL}api/classes/${credentials.defaultClassId}/grade_book`,
      params: authorization,
    },
    classQuizzes: {
      method: 'GET',
      url: `${credentials.StackedBaseURL}api/classes/${credentials.defaultClassId}/class_quizzes`,
      params: authorization,
    },
    files: {
      method: 'GET',
      url: `${credentials.StackedBaseURL}api/courses/${credentials.testCourseId}/files`,
      params: authorization,
    },
    instructorQuizzes: {
      method: 'GET',
      url: `${credentials.StackedBaseURL}api/courses/${credentials.testCourseId}/quizzes?role=instructor`,
      params: authorization,
    },
    users: {
      method: 'GET',
      url: `${credentials.StackedBaseURL}api/courses/${credentials.defaultClassId}/users`,
      params: authorization,
    },
    feed: {
      method: 'GET',
      url: `${credentials.StackedBaseURL}api/courses/${credentials.testCourseId}/feed`,
      params: authorization,
    },
  },
};
