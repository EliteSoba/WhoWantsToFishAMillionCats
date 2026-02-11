import fs from 'node:fs';

const MIN_DAY = 32;
const FIRST_DAY = new Date('2024-06-24');
let MAX_DAY = Math.floor((new Date() - FIRST_DAY) / (24 * 3_600_000));

// TODO
//MAX_DAY = 35;

async function fetchDay(day) {
  const data = await fetch(`https://catfishing.net/api/game?day=${day}`);
  const jsonData = await data.json();
  return jsonData;
};

const fetches = [];
for (let i = MIN_DAY; i <= MAX_DAY; i++) {
  fetches.push(() => fetchDay(i));
}

let i = 0;
const allData = {};


const finalCallback = (data) => {
  try {
    fs.writeFileSync('./catfishing.json', JSON.stringify(data));
  } catch (e) {
    console.log(allData);
  }
}

let interval;
interval = setInterval(async () => {
  if (i >= fetches.length) {
    clearInterval(interval);
    finalCallback(allData);
  }
  else {
    let data = await fetches[i]();
    allData[i + MIN_DAY] = data;
    i++;
    if (i % 10 === 0) {
      console.log(`Fetched ${i} of ${MAX_DAY - MIN_DAY}`);
    }
  }
}, 1_000);
