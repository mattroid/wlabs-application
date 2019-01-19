import { SearchController } from 'controllers/search.controller';
import { expect } from 'chai';
import sinon from 'sinon';

describe('search.controller', () => {
    let controller;
    const searchService = {
        find: sinon.stub().returns([{some:'', result:''}]),
        load: sinon.stub()
    };

    beforeEach(() =>{
        controller = new SearchController(searchService);
    });
    it('should load data', () => {
        expect(searchService.load.called).to.be.true;
    });
    describe('get request', () => {
        it('should return search results', () => {
            const result = controller.get({params: {query: 'needle'}});
            expect(result.length).to.equal(1);
        });
    });
});
