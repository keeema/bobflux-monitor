import { allToString } from '../helpers/string';

describe('helpers', () => {
    describe('string', () => {
        describe('allToString', () => {
            it('returns \'null\' for null', () => {
                expect(allToString(null)).toEqual('null');
            });

            it('returns \'undefined\' for undefined', () => {
                expect(allToString(undefined)).toEqual('undefined');
            });

            it('returns number as string', () => {
                expect(allToString(1)).toEqual('1');
            });

            it('returns boolean as string', () => {
                expect(allToString(true)).toEqual('true');
            });

            it('returns string wrapped with apostrophes string', () => {
                expect(allToString('test')).toEqual('\'test\'');
            });

            it('returns simple object as a string', () => {
                expect(allToString({ test: 1 })).toEqual('{ test: 1 }');
            });

            it('returns object with many properties as a string', () => {
                expect(allToString({ first: 1, second: 2 })).toEqual('{ first: 1, second: 2 }');
            });

            it('returns object with function as a string', () => {
                expect(allToString({ fn: () => 1 })).toEqual('{ fn: function () { return 1; } }');
            });

            it('returns array with simple items as a string', () => {
                expect(allToString([1, 2])).toEqual('[1,2]');
            });

            it('returns array with complex items as a string', () => {
                expect(allToString([{ first: 1 }, { second: 2 }, () => 1]))
                    .toEqual('[{ first: 1 },{ second: 2 },function () { return 1; }]');
            });
        });
    });
});