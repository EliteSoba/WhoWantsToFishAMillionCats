// import fs from 'node:fs';

const fs = require('node:fs');

const MIN_DAY = 32;
const ZEROTH_DAY = new Date('2024-06-24');
let MAX_DAY = Math.ceil((new Date() - ZEROTH_DAY) / (24 * 3_600_000));

// TODO
// MAX_DAY = 307;

async function fetchDay(day) {
  const data = await fetch(`https://catfishing.net/api/game?day=${day}`);
  const jsonData = await data.json();
  return jsonData;
};

fs.promises.readdir('./src/data').then(files => {
  const allDays = files.map(file => file.split('.')[0]);

  const fetches = {};
  for (let i = MIN_DAY; i <= MAX_DAY; i++) {
    if (!allDays.includes(`${i}`)) {
      fetches[i] = () => fetchDay(i);
    }
  }

  const allKeys = Object.keys(fetches);
  if (!allKeys.length) {
    // Nothing to update
    console.log('Already up to date');
    process.exit();
  }

  console.log(`Fetching data from ${allKeys.length} more day(s), starting on day ${allKeys[0]}`);

  allKeys.forEach(async (key, index) => {
    let data = await fetches[key]();

    // idk why this only works one time but unfortunately it's no longer a problem since
    // i've already fetched everything. gotta remember to clean it up for next time.
    const x = await new Promise(r => setTimeout(r, 2000));
    console.log(x);
    try {
      fs.writeFileSync(`./src/data/${key}.json`, JSON.stringify(data));
    } catch (e) {
      console.log(allData);
    }

    if (index % 10 === 0) {
      console.log(`Fetched ${index} of ${allKeys.length}`);
    }
  });
});
