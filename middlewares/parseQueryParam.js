async function parseQueryParm(req, __, next) {
  const { query } = req;
  const parseObject = {};
  Object.keys(query).forEach((key) => {
    const value = query[key];
    if (isNumber(value)) {
      parseObject[key] = +value;
    } else if (value.trim().toLowerCase() === 'false') {
      parseObject[key] = false;
    } else if (value.trim().toLowerCase() === 'true') {
      parseObject[key] = true;
    } else {
      parseObject[key] = value;
    }
  });
  req.query = { ...parseObject };
  next();
}
function isNumber(n) {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

module.exports = {
  parseQueryParm
};
