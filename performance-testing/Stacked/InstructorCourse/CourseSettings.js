import http from 'k6/http';
import { check, group } from 'k6';
import { stackedRequests } from '../../requests.js';

export function Settings() {
  group('Test for Settings Tab: ', function () {
    group('Settings landing page:', function () {
      group('Page render:', function () {
        const settingsPage = http.get(
          stackedRequests.pages.settings.url,
          stackedRequests.pages.settings.params
        );
        check(settingsPage, {
          'Settings page status is 200': (r) => r.status === 200,
          'Settings page response time is less than or equal to 1 second': (
            r
          ) => r.timings.duration <= 1000,
        });
        errorRate.add(!(settingsPage.status < 300));
      });

      group('API:', function () {
        const responses = http.batch([stackedRequests.api.classes]);
        for (let index = 0; index < responses.length; index++) {
          group('Response status:', function () {
            check(responses, {
              'Classes API status is ok': (r) => r[0].status === 200,
            });
          });
          group('Response time:', function () {
            check(responses, {
              'Classes API response time is less than or equal to 1 second': (
                r
              ) => r[0].status <= 1000,
            });
          });
        }
      });
    });
  });
}
