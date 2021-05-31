const fs = require('fs');

const writeData = (database) => fs.writeFileSync(`${__dirname}/database.json`, JSON.stringify(database), 'utf-8');

module.exports = writeData;