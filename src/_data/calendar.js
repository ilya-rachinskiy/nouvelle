const https = require('https');

function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          let response = JSON.parse(body);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }
      );
    }).on('error', (e) => {
      reject(e)
    });
  });
}

module.exports = () => getJson('https://web-standards.ru/calendar.json').then(events => ({ events }));