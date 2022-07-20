import http from 'k6/http';
import { check, group } from 'k6';
import { stackedRequests } from '../../requests.js';

export function ShareCourse() {
  group('Test for Share Course Tab: ', function () {
    group('Share Course landing page:', function () {
      group('Page render:', function () {
        const shareCoursePage = http.get(
          stackedRequests.pages.shareCourse.url,
          stackedRequests.pages.shareCourse.params
        );
        check(shareCoursePage, {
          'Share Course page status is 200': (r) => r.status === 200,
          'Share Course page response time is less than or equal to 1 second': (
            r
          ) => r.timings.duration <= 1000,
        });
        errorRate.add(!(shareCoursePage.status < 300));
      });

      group('API:', function () {
        const responses = http.batch([stackedRequests.api.classes]);
        for (let index = 0; index < responses.length; index++) {
          group('Response status:', function () {
            check(responses, {
              'Classes API status is 200': (r) => r[0].status === 200,
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
