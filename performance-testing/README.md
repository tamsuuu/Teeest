# What is k6.io

Grafana k6 is an open-source load testing tool that makes performance testing easy and productive for engineering teams. k6 is free, developer-centric, and extensible.

Using k6, you can test the reliability and performance of your systems and catch performance regressions and problems earlier. k6 will help you to build resilient and performant applications that scale.

k6 is developed by Grafana Labs and the community.

---

# Install k6.io

- Go to [k6.io Installation Guide](https://k6.io/docs/getting-started/installation/)
- Check your Device OS

## Linux Device

### Debian Ubuntu

- `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69`
- `echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list`
- `sudo apt-get update`
- `sudo apt-get install k6`

### Fedora/CentOS

- Using dnf or yum on old versions:
- `sudo dnf install https://dl.k6.io/rpm/repo.rpm`
- `sudo dnf install k6`

### MacOS

- Using [Homebrew](https://brew.sh/)
- `brew install k6`

### Windows

If you use the [Chocolatey package manager](https://chocolatey.org/) you can install the unofficial k6 package with:

- `choco install k6`

or if you use the Windows Package Manager you can install the official packages from the k6 manifests (created by the community) with:

- `winget install k6`

---

# Cloning of projects

- Go to [K6 Stacktrek Projects](https://gitlab.com/elycisjasa123/k6.io)
- Clone the repo using SSH

![Image 1](https://scontent.xx.fbcdn.net/v/t1.15752-9/273155178_313665477446483_1889181741416480166_n.png?stp=dst-png_p228x119&_nc_cat=103&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeHKdg3UYB4effsTi5lhplYttkoNea14qZy2Sg15rXipnHLXvZ52XBzSYzPPLXAMjWPrcAljCRkWmNAmofehm161&_nc_ohc=x3XFgPOMjX0AX-lVPJs&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVJzYeO1ZZZlRxPMl6wmqIKa2mcshG2zRbOvc5rCzpTwGQ&oe=62328145)

- Open your available command line
- Type `git clone git@gitlab.com:elycisjasa123/k6.io.git`

---

# Environment Variables

- Inside the project create `environment_variables.js` file
- paste this content

```javascript
module.exports = {
  stackleague: {
    url: 'https://staging.stackleague.com',
    request_url: 'https://staging.stackleague.com',
    dashboard: {
      token: '',
      user_info: {
        first_name: '',
        last_name: '',
        email: '',
        partner_id: null || number_value,
      },
    },
    stagingSeason: 'February 22, 2022, 01:30:00 pm',
    productionSeason: 'February 22, 2022, 08:00:00 pm',
    startWeek: '2022-05-07T16:00:00.000Z',
    endWeek: '2022-05-14T15:59:59.999Z',
  },

  stacked: {
    url: 'https://dev.edu.stacktrek.com',
    request_url: 'https://dev.edu.stacktrek.com',
    overview: {
      student_token: ``,
      course_key: `3KpYzeEJybGQ`,
      course_id: 2348,
      class_id: 4287,
    },
    enrollCourseKey: '3KpYzeEJybGQ', // Change
    coursePurchaseIntentPayload: {
      courseId: 2348,
      slots: 1,
      currency: 'PHP',
      organizationId: null,
    },
    coursePurchasePayload: {
      courseId: 2348,
      paymentIntentId: '',
      slots: 1,
      organizationId: null,
      selfEnroll: true,
      discountCode: 'LFI3NVG8',
      isUpgradingToPremium: false,
    },
  },

  stacklab_exam: {
    url: 'https://league-staging.stacktrek.com',
    request_url: 'https://league-staging.stacktrek.com',
    participant_token: ``,
    run_code_payload: {
      contest_id: 2677,
      problem_id: 747,
      language_id: 2,
      solution: 'def find_emirp(n):\n x = True\n while(x==True):\n  print(x)',
      test: 'def test___DS___case_1 (self):\n    self.assertEqual(find_emirp(50), [4, 37, 98])\n\n   \ndef test___DS___case_2 (self):\n    self.assertEqual(find_emirp(100), [8, 97, 418])\n\n   \ndef test___DS___case_3 (self):\n    self.assertEqual(find_emirp(200), [15, 199, 1489])',
    },
    contest_id: 2963,
  },

  playground: {
    url: 'https://dev.liveshare.stacktrek.com',
    trainee_token: ``,
    payload: {
      solution:
        'function wave(str) {\n  let newArr = [];\n  for (let i = 0; i < str.length; i++) {\n    let copy = str.split("");\n    if (copy[i] !== " ") {\n      copy[i] = copy[i].toUpperCase();\n      newArr.push(copy.join(""));\n    }\n  }\n  return newArr;\n}\n\n\nconst readline = require(\'readline-sync\');\n\nconst insertPhrase = readline.question(\'Enter a Phrase:\');\n\nconsole.log(wave(insertPhrase));\n',
      language: 'JavaScript',
      inputs: [''],
    },
  },

  accounts: {
    url: 'https://accounts2-staging.stacktrek.com',
    request_url: 'https://accounts2-staging.stacktrek.com',
  },

  users: [
    'miyate1358@pxjtw.com',
    'dagala4256@yektara.com',
    'dagala4256@yektara.com',
    'jexelig703@wncnw.com',
    'hewenax756@pxjtw.com',
    'vesoga1074@yektara.com',
    'goxomej581@yektara.com',
    'tovan68757@sdysofa.com',
    'jorar30036@pxjtw.com',
    'timox47655@hebgsw.com',
    'bipix22669@ahhtee.com',
    'wiwad62059@94jo.com',
    'defikih298@ahhtee.com',
    'kerav34306@ahhtee.com',
    'tavifo3498@hafutv.com',
    'newuser101@gmail.com',
    'tagenak895@hafutv.com',
    'sitabiw450@econeom.com',
    'rabema2400@febeks.com',
    'ditedo9035@cctyoo.com',
    'lijexi1153@cctyoo.com',
    'bajeti4020@cctyoo.com',
    'yerana1896@econeom.com',
    'johofam581@cctyoo.com',
    'jokin71799@econeom.com',
    'xegawi5320@febeks.com',
    'nojiho9581@febeks.com',
    'xerape7964@95ta.com',
    'mehope7177@econeom.com',
    'coroced196@econeom.com',
    'jovow80346@cctyoo.com',
    'hamoriy824@cctyoo.com',
    'wexise6594@cctyoo.com',
    'riwif26525@cctyoo.com',
    'masoxif876@febeks.com',
    'gisoy54385@hafutv.com',
    'tixodi1331@hafutv.com',
    'jikero8469@hafutv.com',
    'jogalan580@hafutv.com',
    'pacosa6230@econeom.com',
    'cofam36644@hafutv.com',
    'vocen67237@febeks.com',
    'tepat26377@econeom.com',
    'vamim43179@febeks.com',
    'tofav91642@cctyoo.com',
    'fofafe8416@hafutv.com',
    'jocok51072@febeks.com',
    'vixador685@febeks.com',
    'jexecer547@econeom.com',
    'xijaja8324@econeom.com',
    'bomehil804@econeom.com',
    'jamoya1272@hafutv.com',
    'renodox608@febeks.com',
    'hojep22724@cctyoo.com',
    'fogobig788@febeks.com',
    'kejaki3517@febeks.com',
    'bexol85361@econeom.com',
    'potoji8674@hafutv.com',
    'sogahif837@febeks.com',
    'gawol13661@cctyoo.com',
    'jikahap842@econeom.com',
    'hiveka3187@febeks.com',
    'recaj70911@hafutv.com',
    'famaj15436@econeom.com',
    'kevej56086@hafutv.com',
    'camako3461@febeks.com',
    'minoner999@febeks.com',
    'reyowed129@cctyoo.com',
    'vogoga3263@hafutv.com',
    'nomoc17748@hafutv.com',
    'johntrevor10001@gmail.com',
    'anthonytamtam22@yahoo.com',
    'tamsu2218@gmail.com',
    'kiwox67272@boersy.com',
    'salahom996@95ta.com',
    'lolamet314@94jo.com',
    'hefesi4962@ahhtee.com',
    'lirodi7030@boersy.com',
    'xakesi5725@ahhtee.com',
    'yareya2084@94jo.com',
    'potoham322@95ta.com',
    'bapecak261@boersy.com',
    'mevimem679@95ta.com',
    'feyay24039@94jo.com',
    'mekikoj541@boersy.com',
    'geyicot467@boersy.com',
    'saraha5851@ahhtee.com',
    'celil85497@94jo.com',
    'parami4192@95ta.com',
    'henogi6347@94jo.com',
    'dibec49134@95ta.com',
    'rayayo9175@ahhtee.com',
    'woyikoj654@95ta.com',
    'vcristhya@remarkable.rocks',
    'uaymenlozad@metuinsaat.com',
    'hmustafa@mightcubed.com',
    'nejidic340@chatdays.com',
    'nepegic854@j24blog.com',
    'geropim355@chatdays.com',
    'tecop11078@aomrock.com',
  ],
};
```

- Ask for the Stacktrek QA's Team for the environment variables

##### Login Response Guide

```json
{
  "jwt": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzdGFja3RyZWtfYWNjb3VudCIsImV4cCI6MTY1NzI0NzMwMCwiaWF0IjoxNjU0ODI4MTAwLCJpc3MiOiJzdGFja3RyZWtfYWNjb3VudCIsImp0aSI6IjNiNjIyNGU2LWYxZTItNDIyYS05NDgwLWE5YmU1NmRhZGQ5ZCIsIm5iZiI6MTY1NDgyODA5OSwic3ViIjoiMTIyNjUiLCJ0eXAiOiJhY2Nlc3MifQ.HOkU6vmOtIVDYUC2Y0qFPCl7IgHUa27MuY0clQZrLu4gPtcjlnsweI9Bkf1fafd0N9yY5gvzBfbLPuX_0w3LWQ",
  "user": {
    "userMedia": [],
    "employments": [],
    "email": "xawiko3921@sicmag.com",
    "location": "Iloilo City",
    "accountSettings": {
      "has_changed_default_password": true,
      "has_onboarded": true,
      "has_onboarded_in_stackleague_platform": true,
      "has_visited_stackleague": true,
      "hide_preferred_languages_modal": true,
      "overall_statistics_score_is_public": false,
      "visited_profile": true
    },
    "educations": [],
    "mobileNumber": null,
    "insertedAt": "2021-09-10T03:13:52",
    "role": "user",
    "id": 12265,
    "googleId": null,
    "websites": [],
    "followingCount": 0,
    "isVerified": true,
    "codingLanguages": [],
    "followersCount": 0,
    "viewProfileRequestsCount": 0,
    "connectionCount": 0,
    "portfolios": [],
    "certifications": [],
    "pendingOrganizations": [],
    "username": "xawiko-sicmag-EwCAZlCm15XA",
    "organizations": [],
    "photoUrl": null,
    "birthdate": null,
    "firstName": "Xawiko",
    "fbId": null,
    "coverPhotoUrl": null,
    "school": null,
    "lastName": "Sicmag",
    "about": null,
    "company": null,
    "title": "Coder at StackTrek Enterprise",
    "hasPassword": null
  }
}
```
