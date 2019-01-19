import request from 'request-promise';
import FuzzySearch from 'fuse.js';
/*
 * Uses request to talk to the walmart api
 * it caches results in memory
 * 
 */
export default class SearchService {
    constructor(){
        this.CACHE = {};
    }
    async load(apiUrl) {
        const response = await request.get({ uri: apiUrl, json: true});

        if (!response.items) {
            logger.error('could not load any items from walmart api');
            return;
        }

        // clear the cache
        this.CACHE = {};

        logger.info(`loading ${response.items.length} items from walmart api`);

        this.CACHE = response.items;

        // rebuild the fuzzy index
        this.searcher = new FuzzySearch(this.CACHE, { keys: ['shortDescription', 'name', 'brandName']});

    }
    find(query){
        // need to have something to search on
        if (!query) return '';

        const result = this.searcher.search(query);

        logger.info(`found ${result.length} items for search string "${query}"`);

        return result;
    }
}
