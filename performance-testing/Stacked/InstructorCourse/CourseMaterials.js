import http from 'k6/http';
import { check, group } from 'k6';
import { stackedRequests } from '../../requests.js';

export function Materials() {
  group('Test for Materials tab:', function () {
    group('Materials landing page:', function () {
      group('Page render:', function () {
        const materialsPage = http.get(
          stackedRequests.pages.materials.url,
          stackedRequests.pages.materials.params
        );
        check(materialsPage, {
          'Materials page status is 200': (r) => r.status === 200,
          'Materials page response time is less than or equal to 1 second': (
            r
          ) => r.timings.duration <= 1000,
        });
        errorRate.add(!(materialsPage.status < 300));
      });

      group('API:', function () {
        const responses = http.batch([
          stackedRequests.api.files,
          stackedRequests.api.instructorQuizzes,
        ]);
        for (let index = 0; index < responses.length; index++) {
          group('Response status:', function () {
            check(responses, {
              'Files API status is 200': (r) => r[0].status === 200,
              'Instructor Quizzes API status is 200': (r) =>
                r[1].status === 200,
            });
          });
          group('Response time:', function () {
            check(responses, {
              'Files API reponse time is less than or equal to 1 second': (r) =>
                r[0].status <= 1000,
              'Instructor Quizzes API reponse time is less than or equal to 1 second':
                (r) => r[1].status <= 1000,
            });
          });
        }
      });
    });
  });
}
