import Boom from 'boom';
import SearchService from 'services/search.service';
import config from 'config';

export class SearchController {
    constructor(searchService){
        this.searchService = searchService;
        this.apiUrl = `${config.WALMART.apiUrl}/items?ids=${config.WALMART.items}&format=json&apiKey=${config.WALMART.apiKey}`;

        // initialize the cache on startup
        this.searchService.load(this.apiUrl);

        // refresh the cache every 5 minutes
        setInterval(this.searchService.load,
            config.SERVER.cacheTimeout,
            this.apiUrl);

    }

    // GET /search/{query}
    get (request) {
        // find in our product cache all product id's matching search criteria

        if (!request.params.query) return Boom.badRequest();

        // find all matches on our query text
        const searchResults = this.searchService.find(request.params.query);

        return searchResults;
    }
}

const searchService = new SearchService();
const searchController = new SearchController(searchService);

export default [{
    method: 'GET',
    path: '/search/{query}',
    handler: searchController.get.bind(searchController)
}];
