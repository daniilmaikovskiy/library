const fs = require('fs');
const os = require('os');

module.exports = (req, res, next) => {
  const now = new Date();
  const [hours, minutes, seconds] = [now.getHours(), now.getMinutes(), now.getSeconds()];

  const { method, url } = req;

  const userAgent = req.get('user-agent');

  const data = `${hours}:${minutes}:${seconds} ${method}: ${url} user-agent: ${userAgent}`;

  fs.appendFile('server.log', data + os.EOL, (err) => {
    if (err) throw err;
  });

  next();
};