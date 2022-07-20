module.exports = {
  credential: JSON.stringify({
    email: 'tamsu2210@gmail.com',
    password: 'password',
  }),

  params: {
    headers: {
      'Content-Type': 'application/json'
    }
  },

  stackleague: {
    url: 'https://staging.stackleague.com',
    request_url: 'https://staging.stackleague.com',
    dashboard: {
      token: `eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzdGFja3RyZWtfYWNjb3VudCIsImV4cCI6MTY0ODY5MjUyNywiaWF0IjoxNjQ2MjczMzI3LCJpc3MiOiJzdGFja3RyZWtfYWNjb3VudCIsImp0aSI6ImM1ODllYjUxLWU0YTQtNDBhNS05MGQ3LThhYzAyMTgwOWJhYyIsIm5iZiI6MTY0NjI3MzMyNiwic3ViIjoiMTIyNjQiLCJ0eXAiOiJhY2Nlc3MifQ.x9rxqMyh1SyhW6xJ2Wa2-GCdIheiU1L9IpeTPIRqtlM0uqgKlDgXjJ8kJ6ltkZiGT-w_3nTInO3NuRE8jBX2vA`,
      user_info: {
        first_name: 'Larore',
        last_name: 'Shensufu',
        email: 'larore2329@shensufu.com',
        partner_id: null,
      },
    },
    stagingSeason: 'February 22, 2022, 01:30:00 pm',
    productionSeason: 'February 22, 2022, 08:00:00 pm',
    startWeek: '2022-05-07T16:00:00.000Z',
    endWeek: '2022-05-14T15:59:59.999Z',
  },

  accounts: {
    url: 'https://accounts-staging.stacktrek.com'
  },

  stacked: {
    url: 'https://dev.edu.stacktrek.com',
    request_url: 'https://dev.edu.stacktrek.com',
    overview: {
      student_token: `eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzdGFja3RyZWtfYWNjb3VudCIsImV4cCI6MTY1NDgyNDI3OCwiaWF0IjoxNjUyNDA1MDc4LCJpc3MiOiJzdGFja3RyZWtfYWNjb3VudCIsImp0aSI6IjE5Mjk0MDIxLWI3ZmQtNDlkOC1hNTEwLWM5OWQ4ZDEyY2I3MSIsIm5iZiI6MTY1MjQwNTA3Nywic3ViIjoiMTM0IiwidHlwIjoiYWNjZXNzIn0.6oT9DunoV4XMpvlFzKCAfmosXgSa4ccwgbLyQHaOdwNPzxRqYL8ueHbM48dSNuoN99gUBB-fMHtlqqBaFwsC_Q`,
      course_key: `XpV9DNNDYrwz`,
      course_id: 2000,
      class_id: 3567,
    },
  },
};