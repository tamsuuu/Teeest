import http from 'k6/http';
import { check, group, sleep } from 'k6';
import env from '../../environment_variables.js';
import {
  topFiftyOverAllRankings,
  topFiftyWeeklyRanking,
  topFiftyOverAllTeamRankings,
  topFiftyWeeklyTeamRankings,
} from '../../functional.js';

export function setup() {
  // This is for setup process...
}

export function rankingPage() {
  group('Stackleague Rankings', () => {
    group('Ranking Page', () => {
      const rankingPage = http.get(env.stackleague.url);

      check(rankingPage, {
        'Ranking Page successfully render less than 1 seconds': (r) =>
          r.timings.duration < 1000,
      });

      sleep(1);
    });

    group('Ranking API', () => {
      group('Individual Category', () => {
        // Top 50 Overall Rankings
        topFiftyOverAllRankings(
          env.stackleague.request_url,
          env.stackleague.stagingSeason
        );

        // Top 50 Weekly Rankings
        topFiftyWeeklyRanking(
          env.stackleague.request_url,
          env.stackleague.startWeek,
          env.stackleague.endWeek
        );
      });

      group('Team Category', () => {
        // Top 50 Overall Rankings
        topFiftyOverAllTeamRankings(
          env.stackleague.request_url,
          env.stackleague.stagingSeason
        );

        // Top 50 Weekly Rankings
        topFiftyWeeklyTeamRankings(
          env.stackleague.request_url,
          env.stackleague.startWeek,
          env.stackleague.endWeek
        );
      });
    });
  });
}
