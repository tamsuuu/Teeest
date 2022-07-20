import http from 'k6/http';
import { check, group, sleep } from 'k6';
import env from '../../environment_variables.js';
import {
  topTenOverAllRankings,
  topTenOverAllTeamRankings,
  topTenWeeklyRanking,
  topTenWeeklyTeamRankings,
} from '../../functional.js';

export function setup() {
  // This is for setup process...
}

export function landingPage() {
  group('Stackleague Landing', () => {
    group('Landing Page', () => {
      const homePage = http.get(`${env.stackleague.url}/`);

      check(homePage, {
        'Successfully render less than 1 seconds': (r) =>
          r.timings.duration < 1000,
      });

      sleep(1);
    });

    group('Landing Page API', () => {
      group('Individual Category', () => {
        // Top 10 Overall Individual Rankings
        topTenOverAllRankings(
          env.stackleague.request_url,
          env.stackleague.stagingSeason
        );

        // Top 10 Weekly Individual Rankings
        topTenWeeklyRanking(
          env.stackleague.request_url,
          env.stackleague.startWeek,
          env.stackleague.endWeek
        );
      });

      group('Team Category', () => {
        // Top 10 Overall Team Rankings
        topTenOverAllTeamRankings(
          env.stackleague.request_url,
          env.stackleague.stagingSeason
        );

        // Top 10 Weekly Team Rankings
        topTenWeeklyTeamRankings(
          env.stackleague.request_url,
          env.stackleague.startWeek,
          env.stackleague.endWeek
        );
      });
    });
  });
}
