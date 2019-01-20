import { expect } from 'chai';
import request from 'request-promise';
import sinon from 'sinon';
import SearchService from 'services/search.service';
import _ from 'lodash';

describe('search.searvice', () => {
    let searchService;
    before(() =>{
        sinon.stub(request, 'get').resolves({items: [{name:'foo', shortDescription:'bar', brandName: 'baz'}]});
    });
    beforeEach(async () =>{
        searchService = new SearchService();
        await searchService.load(_.range(1,18));
    });
    it('should get data from api ', () => {
        expect(request.get.called).to.be.true;
    });

    it('should find a record given a search term', () => {
        const result = searchService.find('foo');

        expect(result).to.have.lengthOf(1);
    });

    it('should return nothing if nothing found', () => {
        const result = searchService.find('DoesNotExist');

        expect(result).to.have.lengthOf(0);
    });

    it('should make more than one request for lists longer than 19', async() => {
        const list = _.range(1, 21);

        request.get.resetHistory();

        await searchService.load(list);

        expect(request.get.callCount).to.equal(2);

    });
});
