import http from "k6/http";
import { check } from "k6";

export const options = {
  scenarios: {
    "load-test": {
      executor: 'ramping-vus',
      stages: [
        { duration: '20s', target: 50 },
        { duration: '5s', target: 50 },
        { duration: '20s', target: 100 },
        { duration: '10s', target: 100 },
        { duration: '30s', target: 200 },
        { duration: '10s', target: 200 },
        { duration: '25s', target: 300 },
        { duration: '10s', target: 300 },
        { duration: '10s', target: 300 },
        { duration: '30s', target: 500 },
        { duration: '1m', target: 500 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '2s',
    }
  },

  thresholds: {
    // 'http_req_duration{name: "test"}':  ['p(99)<3000' ],
    'http_req_duration{name: "cdn"}':  ['p(99)<3000' ],

  }
}

export default function() {
  // const res1 = http.get('https://test.edu.stacktrek.com/marketplace', {
  //   tags:{
  //     name: "test"
  //   }
  // });

  // check(res1, {
  //   "status is 200" : (r) => r.status === 200
  // }); 

  const res2 = http.get('https://cdn.test.edu.stacktrek.com/marketplace', {
    tags:{
      name: "cdn"
    }
  });
  check(res2, {
    "status is 200" : (r) => r.status === 200
  }); 

  if(res2.status !== 200) {
    console.log(res2.status)
  }
}