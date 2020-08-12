import { config } from './config';
import fs = require('fs');
fs.writeFileSync('ormconfig.json', JSON.stringify(config.database, null, 2));
