import http from 'k6/http';
import { check, group, sleep } from 'k6';
import env from '../../../environment_variables.js';
import {
  stacktrekAcademySkillFreeNoAuth,
  stacktrekAcademyFreeNoAuth,
  stacktrekAcademySchoolYearOneNoAuth,
  stackleagueCourseNoAuth,
  publicCourseFreeNoAuth,
} from '../../../functional.js';

export function setup() {
  // This is for set up process...
}

// LandingPage
export function marketplaceLandingPage() {
  group('Marketplace Landing Page', () => {
    const landingPage = http.get(`${env.stacked.url}/marketplace`, {
      tags: {
        name: "statusResponse"
      }
    });
    check(landingPage, {
      "Marketplace Landing page status is 200": (r) => r.status === 200
    })

    if(landingPage.status !== 200) {
      console.log(landingPage.status)
    }

    sleep(1);

    group('Marketplace Landing Page API', () => {
      stacktrekAcademySkillFreeNoAuth(env.stacked.request_url);
      stacktrekAcademyFreeNoAuth(env.stacked.request_url);
      stacktrekAcademySchoolYearOneNoAuth(env.stacked.request_url);
      stackleagueCourseNoAuth(env.stacked.request_url);
      publicCourseFreeNoAuth(env.stacked.request_url);
    });
  });
}
