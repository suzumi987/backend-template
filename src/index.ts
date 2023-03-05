import './LoadEnv';
import app from './Server';
import logger from '@shared/Logger';

import fs from 'fs'
import https from 'https'

// // Start the server
const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
    logger.info('Simple project server started on port: ' + port);
});


