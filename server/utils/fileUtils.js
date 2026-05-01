const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data');

const readData = (filename) => {
  try {
    const data = fs.readFileSync(path.join(dataPath, filename), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
};

const writeData = (filename, data) => {
  try {
    fs.writeFileSync(path.join(dataPath, filename), JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
};

module.exports = { readData, writeData };
