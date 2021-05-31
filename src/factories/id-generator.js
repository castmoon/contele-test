const generateNewId = () => {
    return Math.random().toString(32).substr(2,9);
  }

module.exports = generateNewId;