import { courseOverview } from './CourseOverview.js';
import { courseLessons } from './courseLessons.js';
import { courseMaterials } from './CourseMaterials.js';
import { courseGrades } from './CourseGrades.js';

// Options of courseStudent
export let options = {
  scenarios: {
    StudentCourse: {
      executor: 'constant-vus',
      vus: 50,
      duration: '1m',
    },
  },
  insecureSkipTLSVerify: true,
  thresholds: {
    http_req_failed: ['rate<0.50'],
    http_req_duration: [
      { threshold: 'p(95)<10000', abortOnFail: false },
      { threshold: 'p(90)<10000', abortOnFail: false },
    ],
    checks: ['rate>0.95'],
    'Error Rate': ['rate<0.01'],
  },
};

export default function () {
  courseOverview();
  courseLessons();
  courseMaterials();
  courseGrades();
}
