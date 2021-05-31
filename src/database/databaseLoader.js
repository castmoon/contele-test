const fs = require('fs');

const readDatabase = () => JSON.parse(fs.readFileSync(`${__dirname}/database.json`), 'utf-8');

module.exports = readDatabase;