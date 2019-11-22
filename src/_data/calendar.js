const https = require('https');
const calendar = 'https://web-standards.ru/calendar.json';

function getJson(url) {
    return new Promise((resolve, reject) => {
        https
            .get(url, res => {
                let body = '';

                res.on('data', chunk => {
                    body += chunk;
                });

                res.on('end', () => {
                    try {
                        let response = JSON.parse(body);
                        resolve(response);
                    } catch (error) {
                        reject(error);
                    }
                });
            })
            .on('error', e => {
                reject(e);
            });
    });
}

module.exports = () => getJson(calendar).then(events => ({ events }));
