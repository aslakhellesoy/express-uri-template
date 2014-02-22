var eut = require('..');
var Route = require('express').Route;
var assert = require('assert');

describe('Express pattern', function() {
  it('expands a template using object', function() {
    var params = {
      bar: 9,
      snip: 'yo'
    };
    assertRoute('/foo/:bar/zap/:snip', '/foo/9/zap/yo', params);
  });

  it('expands a template using req.params style Array', function() {
    var params = [];
    params['bar'] = 9;
    params['snip'] = 'yo';

    assertRoute('/foo/:bar/zap/:snip', '/foo/9/zap/yo', params);
  });

  it('expands a template with path globs', function() {
    var params = [];
    params['bar'] = 9;
    params[0] = 'yo';
    params[1] = 'there';

    assertRoute('/foo/:bar/zap/*/hello/*', '/foo/9/zap/yo/hello/there', params);
  });

  it('throws exception is not all glob params are supplied', function() {
    try {
      eut('/foo/:bar/zap/*/hello/*', ['x']);
      assert.fail('Should have failed');
    } catch(expected) {
      assert.equal(expected.message, 'There were unexpanded params: /foo/:bar/zap/x/hello/*');
    }
  });

  it('throws exception is not all regular params are supplied', function() {
    try {
      eut('/foo/:bar/:zap', {zap: 'zip'});
      assert.fail('Should have failed');
    } catch(expected) {
      assert.equal(expected.message, 'There were unexpanded params: /foo/:bar/zip');
    }
  });

  it('escapes params', function() {
    var params = {name: 'oh hai'};
    assertRoute('/foo/:name', '/foo/oh%20hai', params);
  });
});

function assertRoute(pattern, path, params) {
  assert.equal(eut(pattern, params), path);
  var route = new Route('GET', pattern);
  assert.ok(route.match(path));
  assert.deepEqual(params, route.params);
}
