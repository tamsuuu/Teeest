import http from 'k6/http';
import { check, group, sleep } from 'k6';
import env from '../../../environment_variables.js';
import {
  verifyToken,
  organization,
  courseLanguage,
  courseSubject,
  stacktrekAcademyCareer,
  stacktrekAcademySkill,
  stacktrekAcademySkillFree,
  stacktrekAcademyFree,
  stacktrekAcademyForSchools,
  stackleagueCourse,
  publicFreeCourse,
  userLevel,
} from '../../../functional.js';

// LandingPage
export function marketplaceLandingPage (jwt) {
  group('Marketplace Landing Page', () => {
    const landingPage = http.get(`${env.stacked.url}/marketplace`, {
      tags: {
        name: "statusResponse"
      }
    });
    check(landingPage, {
      "Marketplace Landing page status is 200": (r) => r.status === 200
    });

    

    if(landingPage.status !== 200) {
      console.log(landingPage.status)
    }

    sleep(1);

    group('Marketplace Landing Page API', () => {
      verifyToken(env.stacked.request_url, jwt);
      organization(env.stacked.request_url, jwt);
      courseLanguage(env.stacked.request_url, jwt);
      courseSubject(env.stacked.request_url, jwt);
      stacktrekAcademyCareer(env.stacked.request_url, jwt);
      stacktrekAcademySkill(env.stacked.request_url, jwt);
      stacktrekAcademySkillFree(env.stacked.request_url, jwt);
      stacktrekAcademyFree(env.stacked.request_url, jwt);
      stacktrekAcademyForSchools(env.stacked.request_url, jwt);
      stackleagueCourse(env.stacked.request_url, jwt);
      publicFreeCourse(env.stacked.request_url, jwt);
      userLevel(env.stacked.request_url, jwt);
    });
  });
}
