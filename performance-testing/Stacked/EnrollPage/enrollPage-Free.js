import { sleep, group, check } from 'k6'
import http from 'k6/http'
import { credentials, authorization } from './environment_variables.js';
import { stackedRequest } from './requests.js';

let pages = stackedRequest.pages;
let apis = stackedRequest.apis;

export function EnrollPageFreeCourse() {
  group('Enroll Page - Free Course', function(){
    group('Enroll Page - Front Page', function(){
      const enrollPageFreeCourse = http.get(
        pages.freeCourse.url,
        authorization
      )

      let enrollPageResponseStatus = check(enrollPageFreeCourse, {
        'Enroll page status is 200': (r) => r.status === 200,
      });

      let enrollPageResponseTime = check(enrollPageFreeCourse, {
        'Enroll page response time less than or equal 1': (r) => r.timings.duration <= 1000,
      });

      errorRate.add(!enrollPageResponseTime);
      errorRate.add(!enrollPageResponseStatus);
    });

    sleep(1);

    group('Enroll Page - API', function(){
      let enrollPageAPIs = http.batch([
        ['POST', apis.verify.url, apis.verify.token, authorization],        
        ['POST', apis.states.url, apis.states.payload, authorization],
        ['GET', apis.courseByCourse.url, null, authorization],
        ['GET', apis.courseLanguage.url, null, authorization],
        ['GET', apis.courseSubject.url, null, authorization],
        ['GET', apis.career.url, null, authorization],
        ['GET', apis.skill.url, null, authorization],
        ['GET', apis.coursePurchaseSlot.url, null, authorization],
      ]);

      enrollPageAPIs.forEach(function(enrollPageAPIsResponseStatus) {
        check(enrollPageAPIsResponseStatus, {
          'Enroll page API status is 200/201': (r)=> r.status === 200 || 201,
        });

        errorRate.add(!enrollPageAPIsResponseStatus);
      });

      enrollPageAPIs.forEach(function(enrollPageAPIsResponseTime) {
        check(enrollPageAPIsResponseTime, {
          'Enroll page API response time less than or equal 1': (r) => r.timings.duration <= 1000,
        });

        errorRate.add(!enrollPageAPIsResponseTime);
      });
    });

    sleep(1);

    group('Course Purchase - Front Page', function(){
      const freeCoursePurchase = http.get(
        pages.freeCourse.url,
        authorization
      )

      let freeCoursePurchaseResponseStatus = check(freeCoursePurchase, {
        'Course purchase page status is 200' : (r) => r.status === 200,
      });

      let freeCoursePurchaseResponseTime = check(freeCoursePurchase, {
        'Course purchase page response time less than or equal 1' : (r) => r.timings.duration <= 1000,
      });

      errorRate.add(!freeCoursePurchaseResponseStatus);
      errorRate.add(!freeCoursePurchaseResponseTime);
    });

    sleep(1);

    group('Course Purchase - APIS', function(){
      let freeCoursePurchaseAPIs = http.batch([
        ['PUT', apis.coursePurchase.url, apis.coursePurchase.payload, authorization],        
        ['POST', `${apis.coursePurchase.url}/680`, null, authorization],
      ]);

      freeCoursePurchaseAPIs.forEach(function(freeCoursePurchaseAPIsResponseStatus) {
        check(freeCoursePurchaseAPIsResponseStatus, {
          'Course purchase APIs is status 200/201': (r)=> r.status === 200 || 201,
        });

        errorRate.add(!freeCoursePurchaseAPIsResponseStatus);
      });

      freeCoursePurchaseAPIs.forEach(function(freeCoursePurchaseAPIsResponseTime) {
        check(freeCoursePurchaseAPIsResponseTime, {
          'Course purchase APIs response time less than or equal 1' : (r) => r.timings.duration <= 1000,
        });

        errorRate.add(!freeCoursePurchaseAPIsResponseTime);
      });
    });    

    sleep(1);

  });
}
