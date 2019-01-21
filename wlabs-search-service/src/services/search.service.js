import request from 'request-promise';
import FuzzySearch from 'fuse.js';
import config from 'config';
import _ from 'lodash';

/*
 * Talks to the walmart api to get product information to search on. caches
 * results in memory and searches on the in-memory data.
 *
 * Fuse.js allows the use of fuzzy searching and can support. This library
 * options are extensive and allow for tuning the fuzziness of the search. See
 * for more information: http://fusejs.io/
 */
export default class SearchService {
    /*
     * Loads data in batches. The walmart api allows up to 20 product Id's to be
     * passed into each api request allowing the batching of product results and
     * reducing the number of times the api needs to be called. Additionally
     * there's a limit on the number of api calls per second so to prevent it
     * from erring out the api calls are done in serial order instead of
     * parallel.
     *
     * @method load
     * @param {Number[]}itesmToSearch - array of product id's
     */
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

    /*
     * @method find
     * @param {string} query - the string to search on
     * @returns {Object[]} - list of product objects 
     */
    find(query){
        // need to have something to search on
        if (!query) return [];

        const result = this.searcher.search(query);

        logger.info(`found ${result.length} items for search string "${query}"`);

        return result;
    }
}
