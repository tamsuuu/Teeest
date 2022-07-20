import { faker } from '@faker-js/faker';
import fs from 'node:fs';

let data = [];

for (let i = 0; i <= 3000; i++) {
  let randomName = faker.name.findName(); // Rowan Nikolaus
  let randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
  let name = randomName.split(' ');
  let object = {
    email: randomEmail,
    firstName: name[0],
    lastName: name[1],
  };
  if (data.some((e) => e.email === randomEmail)) {
    console.log('Already exist');
  } else {
    data.push(object);
  }
}

data = JSON.stringify({ user: data });

fs.writeFile('data.json', data, function (err, result) {
  if (err) console.log('error', err);
});
