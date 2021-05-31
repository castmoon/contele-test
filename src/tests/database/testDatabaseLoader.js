const fs = require('fs');

const readTestDatabase = () => JSON.parse(fs.readFileSync(`${__dirname}/testDatabase.json`), 'utf-8');

module.exports = readTestDatabase;