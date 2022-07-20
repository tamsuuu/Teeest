import { sleep, group, check } from 'k6'
import http from 'k6/http'
import { authorization } from './environment_variables.js';
import { stackedRequest } from './requests.js';

let apis = stackedRequest.apis;

export function JoinAsInstructor() {
  group('Join As Instructor', function(){
    let joinRequest = http.post(
      apis.requestJoinAsInstructor.url,
      null,
      authorization
    )

    let joinRequestResponseStatus = check(joinRequest, {
      'Join as instructor API status 200': (r) => r.status === 200,
    });

    let joinRequestResponseTime = check(joinRequest, {
      'Join as instructor API response time less than or equal 1': (r) => r.timings.duration <= 1000,
    });

    errorRate.add(!joinRequestResponseStatus);
    errorRate.add(!joinRequestResponseTime);

    sleep(1);

  });     
}
