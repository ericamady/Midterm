import fs from 'node:fs';
import path from 'node:path';

const logDirectory = path.join('logs');
const logFile = path.join(logDirectory, 'error.txt');

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    const errorMessage = [
        `[${new Date().toISOString()}]`,
        `${req.method} ${req.originalUrl}`,
        `Status: ${statusCode}`,
        `Error: ${err.stack || err.message || 'Unknown error'}`
    ].join(' - ') + '\n\n';

    
    if (res.headersSent) {
        return next(err);
    }

   // Create directory
    fs.mkdir(logDirectory, { recursive: true }, (mkdirErr) => {
        if (mkdirErr) {
            console.error('Could not create logs directory:', mkdirErr);
            console.error(err);
            return res.status(statusCode).json({
                status,
                message: err.message || 'Internal Server Error'
            });
        }

        fs.appendFile(logFile, errorMessage, (writeErr) => {
            if (writeErr) {
                console.error('Could not write error log:', writeErr);
                console.error(err);
            }

            
            res.status(statusCode).json({
                status,
                message: err.message || 'Internal Server Error'
            });
        });
    });
};

export default errorHandler;