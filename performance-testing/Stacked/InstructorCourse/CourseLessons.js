import http from 'k6/http';
import { check, group } from 'k6';
import { stackedRequests } from '../../requests.js';

export function Lessons() {
  group('Test for Lessons tab:', function () {
    group('Lessons landing page:', function () {
      group('Page render:', function () {
        const lessonsPage = http.get(
          stackedRequests.pages.lessons.url,
          stackedRequests.pages.lessons.params
        );
        check(lessonsPage, {
          'Lessons page status is 200': (r) => r.status === 200,
          'Lessons page response time is less than or equal to 1 second': (r) =>
            r.timings.duration <= 1000,
        });
        errorRate.add(!(lessonsPage.status < 300));
      });

      group('API:', function () {
        const responses = http.batch([stackedRequests.api.classes]);
        for (let index = 0; index < responses.length; index++) {
          group('Response status: ', function () {
            check(responses, {
              'Lessons API status is 200': (r) => r[0].status === 200,
            });
          });
          group('Response time: ', function () {
            check(responses, {
              'Lessons API response time is less than or equal to 1 second': (
                r
              ) => r[0].timings.duration <= 1000,
            });
          });
        }
      });
    });
  });
}
