var eut = require('..');
var assert = require('assert');

describe('Express pattern', function() {
  it('expands a template using object', function() {
    var params = {
      bar: 9,
      snip: 'yo'
    };

    assert.equal(eut('/foo/:bar/zap/:snip', params), '/foo/9/zap/yo');
  });

  it('expands a template using req.params style Array', function() {
    var params = [];
    params['bar'] = 9;
    params['snip'] = 'yo';

    assert.equal(eut('/foo/:bar/zap/:snip', params), '/foo/9/zap/yo');
  });

  it('expands a template with path globs', function() {
    var params = [];
    params['bar'] = 9;
    params[0] = 'yo';
    params[1] = 'there';

    assert.equal(eut('/foo/:bar/zap/*/hello/*', params), '/foo/9/zap/yo/hello/there');
  });

  it('leaves params unexpanded', function() {
    var params = [];
    assert.equal(eut('/foo/:bar/zap/*/hello/*', params), '/foo/:bar/zap/*/hello/*');
  });

  it('escapes values', function() {
    var params = {name: 'oh hai'};
    assert.equal(eut('/foo/:name', params), '/foo/oh%20hai');
  });
});
