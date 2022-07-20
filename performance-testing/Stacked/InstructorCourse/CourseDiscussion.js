import http from 'k6/http';
import { check, group } from 'k6';
import { stackedRequests } from '../../requests.js';

export function Discussion() {
  group('Test for Discussions Tab: ', function () {
    group('Discussion landing page:', function () {
      group('Page render:', function () {
        const discussionPage = http.get(
          stackedRequests.pages.discussion.url,
          stackedRequests.pages.discussion.params
        );
        check(discussionPage, {
          'Discussion page status is 200': (r) => r.status === 200,
          'Discussion page response time is less than or equal to 1 second': (
            r
          ) => r.timings.duration <= 1000,
        });
        errorRate.add(!(discussionPage.status < 300));
      });

      group('API:', function () {
        const responses = http.batch([
          stackedRequests.api.feed,
          stackedRequests.api.classes,
        ]);
        for (let index = 0; index < responses.length; index++) {
          group('Response status:', function () {
            check(responses, {
              'Feed API status is 200': (r) => r[0].status === 200,
              'Classes API status is 200': (r) => r[1].status === 200,
            });
          });
          group('Response time:', function () {
            check(responses, {
              'Feed API response time is less than or equal to 1 second': (r) =>
                r[0].status <= 1000,
              'Classes API response time is less than or equal to 1 second': (
                r
              ) => r[1].status <= 1000,
            });
          });
        }
      });
    });
  });
}
