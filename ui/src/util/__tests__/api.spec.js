import { normalizeProtocol } from '../api.js';

describe('normalizeProtocol()', function() {
  it('prepends https to urls', function() {
    const url = 'google.com';
    expect(normalizeProtocol(url)).toEqual('https://google.com');
  });
});
