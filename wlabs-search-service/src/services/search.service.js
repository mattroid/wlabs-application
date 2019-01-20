import request from 'request-promise';
import FuzzySearch from 'fuse.js';
import config from 'config';
import _ from 'lodash';

/*
 * Uses request to talk to the walmart api
 * it caches results in memory and searches
 * on the in-memory data
 */
export default class SearchService {
    async load(itemsToSearch) {
        if (!itemsToSearch) return;

        // the api can only search 20 items at a time
        const itemChunks = _.chunk(itemsToSearch, 19);

        let foundItems = [];

        // this runs serially but another option is to use bluebirds
        // Promise.each
        for (let i=0; i<itemChunks.length;i++) {
            const chunk = itemChunks[i];
            const apiUrl = `${config.WALMART.apiUrl}/items?ids=${_.join(chunk)}&format=json&apiKey=${config.WALMART.apiKey}`;
            let response = await request.get({ uri: apiUrl, json: true});

            foundItems.push(...response.items);
        }
        logger.info(`loading ${foundItems.length} items from walmart api`);

        // rebuild the fuzzy index
        const options = {
            keys: ['shortDescription', 'name', 'brandName'],
            threshold: 0.4,
            distance: 100,
            minMatchCharLength: 2
        };
        this.searcher = new FuzzySearch(foundItems, options);
    }

    find(query){
        // need to have something to search on
        if (!query) return [];

        const result = this.searcher.search(query);

        logger.info(`found ${result.length} items for search string "${query}"`);

        return result;
    }
}
