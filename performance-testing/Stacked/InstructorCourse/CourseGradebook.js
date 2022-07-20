import http from 'k6/http';
import { check, group } from 'k6';
import { stackedRequests } from '../../requests.js';

export function Gradebook() {
  group('Test for Gradebook Tab: ', function () {
    group('Gradebook landing page:', function () {
      group('Page render:', function () {
        const gradebookPage = http.get(
          stackedRequests.pages.gradebook.url,
          stackedRequests.pages.gradebook.params
        );
        check(gradebookPage, {
          'Gradebook page status is 200': (r) => r.status === 200,
          'Gradebook page response time is less than or equal to 1 second': (
            r
          ) => r.timings.duration <= 1000,
        });
        errorRate.add(!(gradebookPage.status < 300));
      });

      group('API:', function () {
        const responses = http.batch([
          stackedRequests.api.classes,
          stackedRequests.api.gradebook,
          stackedRequests.api.classQuizzes,
        ]);
        for (let index = 0; index < responses.length; index++) {
          group('Response status:', function () {
            check(responses, {
              'Classes API status is 200': (r) => r[0].status === 200,
              'Gradebook API status is 200': (r) => r[1].status === 200,
              'Class Quizzes API status is 200': (r) => r[2].status === 200,
            });
          });
          group('Response time:', function () {
            check(responses, {
              'Classes API response time is less than or equal to 1 second': (
                r
              ) => r[0].status <= 1000,
              'Gradebook API response time is less than or equal to 1 second': (
                r
              ) => r[1].status <= 1000,
              'Class Quizzes API response time is less than or equal to 1 second':
                (r) => r[2].status <= 1000,
            });
          });
        }
      });
    });
  });
}
