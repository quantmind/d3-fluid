import {resolve} from '../../server/utils/path';


describe('server utils', () => {

    test('resolve', () => {
        expect(resolve('/foo', 'bla')).toBe('/foo/bla/');
        expect(resolve('/foo/next', '../bla')).toBe('/foo/bla/');
    });

});
