
import fs from 'node:fs';
import path from 'node:path';

const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();

    req.requestTime = timestamp;

    const logMessage = `${req.method} ${req.originalUrl} - ${timestamp}\n`;

    fs.mkdir('logs', { recursive: true }, (err) => {
        if (err) {
            console.error(err);
            return next();
        }

        
        fs.appendFile(path.join('logs', 'requests.txt'), logMessage, (err) => {
            if (err) {
                console.error('Error logging request:', err);
            }

            next();
        });
    });
};

export default requestLogger;



