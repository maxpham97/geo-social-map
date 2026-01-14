import fs from "fs";

const USERS_COUNT = 10_000;

const firstNames = [
  "Alex", "Maria", "John", "Anna", "David", "Olga", "Michael",
  "Sophia", "Daniel", "Emma", "Ivan", "Elena", "Lucas", "Mia"
];

const lastNames = [
  "Smith", "Johnson", "Petrov", "Ivanova", "Brown", "Taylor",
  "Anderson", "Nguyen", "Kim", "Garcia", "Lopez", "Sato"
];

const interestsPool = [
  "music",
  "travel",
  "photography",
  "reading",
  "sports",
  "cooking",
  "react",
  "programming",
  "hiking",
  "gaming",
  "movies",
  "fitness"
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInterests() {
  const count = Math.floor(Math.random() * 4) + 1; // 1–4 интереса
  const shuffled = [...interestsPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomLat() {
  return +(Math.random() * 180 - 90).toFixed(6);
}

function getRandomLon() {
  return +(Math.random() * 360 - 180).toFixed(6);
}

const users = Array.from({ length: USERS_COUNT }, (_, i) => ({
  id: String(i + 1),
  name: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
  lat: getRandomLat(),
  lon: getRandomLon(),
  interests: getRandomInterests(),
}));

fs.writeFileSync("users.json", JSON.stringify(users, null, 2), "utf-8");

console.log(`✅ Generated ${USERS_COUNT} users → users.json`);
