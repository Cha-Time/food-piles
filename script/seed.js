const {
  db,
  models: { User, Organization },
} = require('../server/db');
const allOrgs = require('../Seed');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced');

  console.log(allOrgs());

  //batch create users, orgs and their associations
  allOrgs().forEach(async org => {
    const uniquename = org.name.slice(0, 2) + org.latitude.slice(4);
    let newUser = await User.create({
      username: uniquename,
      password: '123456',
      email: uniquename + '@test.com',
    });
    let newOrg = await Organization.create(org);

    newUser.setOrganization(newOrg);
  });

  //Create some Users
  const tom = await User.create({
    username: 'tom',
    password: '123456',
    email: 'tom@fake.com',
  });

  const jerry = await User.create({
    username: 'jerry',
    password: '123456',
    email: 'jerry@fake.com',
  });

  //Create some Organizations
  const kfc = await Organization.create({
    name: 'KFC',
    address: '2026 Coney Island Avenue',
    city: 'Brooklyn',
    state: 'NY',
    zipCode: 11230,
    phoneNumber: 7777777777,
    accType: 'donor',
    latitude: '40.6248470',
    longitude: '-73.9712484',
  });


  console.log("seeded successfully");
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
