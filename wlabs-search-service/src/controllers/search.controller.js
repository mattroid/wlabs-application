import Boom from 'boom';
import SearchService from 'search.service';


class SearchController {
    constructor(searchService){
        this.searchService = searchService;
    }

    // GET /search/{query}
    get (request) {
        // find in our product cache all product id's matching search criteria
        // req.params.query?
        if (!request.params.query) return Boom.notFound();

        // find all matches
        const searchResults = this.searchService.find(request.params.query);
        return searchResults;
    }
}

const searchService = new SearchService();
const searchController = new SearchController(searchService);

export default [{
    method: 'GET',
    path: '/search/{query}',
    handler: searchController.get
}];
