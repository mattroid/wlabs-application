import Hapi from 'hapi';

export default class Server {
    constructor(config) {
        // Create a server with a host and port
        this.server = Hapi.server({
            host:'localhost',
            port:config.SERVER.port,
            routes: { cors: true}
        });
    }


    async start() {
        try {
            await this.server.start();
        }
        catch (err) {
            logger.error(err);
            process.exit(1);
        }

        logger.info('Server running at:', this.server.info.uri);
    }

    registerController(controller) {
        this.server.route(controller);
    }

}

