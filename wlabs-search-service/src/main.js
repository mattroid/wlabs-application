import SearchController from 'controllers/search.controller';
import Server from 'server';
import config from 'config';

// Initialize server.
const server = new Server(config);

// Bind to controllers.
const controllers = [
    SearchController,
];

for (const controller of controllers) {
    server.registerController(controller);
}

server.start();

logger.info(`Server started on port ${config.SERVER.port}.`);
