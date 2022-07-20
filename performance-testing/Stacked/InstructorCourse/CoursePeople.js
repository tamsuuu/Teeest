import http from 'k6/http';
import { check, group } from 'k6';
import { stackedRequests } from '../../requests.js';

export function People() {
  group('Test for People Tab: ', function () {
    group('People landing page:', function () {
      group('Page render:', function () {
        const peoplePage = http.get(
          stackedRequests.pages.people.url,
          stackedRequests.pages.people.params
        );
        check(peoplePage, {
          'People page status is 200': (r) => r.status === 200,
          'People page response time is less than or equal to 1 second': (r) =>
            r.timings.duration <= 1000,
        });
        errorRate.add(!(peoplePage.status < 300));
      });

      group('API:', function () {
        const responses = http.batch([
          stackedRequests.api.classes,
          stackedRequests.api.users,
        ]);
        for (let index = 0; index < responses.length; index++) {
          group('Response status:', function () {
            check(responses, {
              'Classes API status is 200': (r) => r[0].status === 200,
              'Users API status is 200': (r) => r[1].status === 200,
            });
          });
          group('Response time:', function () {
            check(responses, {
              'Classes API reponse time is less than or equal to 1 second': (
                r
              ) => r[0].status <= 1000,
              'Users API response time is less than or equal to 1 second': (
                r
              ) => r[1].status <= 1000,
            });
          });
        }
      });
    });
  });
}
