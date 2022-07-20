import { Rate } from 'k6/metrics';
import { Classes } from './CourseClasses.js';
import { Lessons } from './CourseLessons.js';
import { Gradebook } from './CourseGradebook.js';
import { Materials } from './CourseMaterials.js';
import { People } from './CoursePeople.js';
import { Discussion } from './CourseDiscussion.js';
import { ShareCourse } from './ShareCourse.js';
import { Settings } from './CourseSettings.js';

export const errorRate = new Rate('error_rate');

// Test setup
export const options = {
  scenarios: {
    InstructorCourse: {
      executor: 'constant-vus',
      vus: 50,
      duration: '1m',
    },
  },

  thresholds: {
    http_req_failed: ['rate<0.50'],
    http_req_duration: [{ threshold: 'p(95)<20000', abortOnFail: true }],
    checks: ['rate>0.90'],
    errorRate: ['rate<0.50'],
  },
};

// Default function
export default function () {
  Classes();
  Lessons();
  Gradebook();
  Materials();
  People();
  Discussion();
  ShareCourse();
  Settings();
}
