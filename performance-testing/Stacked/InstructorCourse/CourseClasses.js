import http from 'k6/http';
import { check, group } from 'k6';
import { stackedRequests } from '../../requests.js';

export function Classes() {
  group('Test for Classes Tab: ', function () {
    group('Classes landing page:', function () {
      group('Page render:', function () {
        const classesPage = http.get(
          stackedRequests.pages.classes.url,
          stackedRequests.pages.classes.params
        );
        check(classesPage, {
          'Classes page status is 200': (r) => r.status === 200,
          'Classes page response time is less than or equal to 1 second': (r) =>
            r.timings.duration <= 1000,
        });
        errorRate.add(!(classesPage.status < 300));
      });

      group('API:', function () {
        const responses = http.batch([stackedRequests.api.classes]);
        for (let index = 0; index < responses.length; index++) {
          group('Response status: ', function () {
            check(responses, {
              'Classes API status is 200': (r) => r[0].status === 200,
            });
          });
          group('Response time: ', function () {
            check(responses, {
              'Classes API response time is less than or equal to 1 second': (
                r
              ) => r[0].timings.duration <= 1000,
            });
          });
        }
      });
    });
  });
}
