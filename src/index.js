import server from './app.js'
import { config } from './config/config.js';

server.listen(config.port, () =>{
    console.log('Listen Port: ', config.port);
});

