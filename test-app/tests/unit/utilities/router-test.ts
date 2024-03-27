import { module, test } from 'qunit';
import { parseUrl } from 'react-migration-toolkit/react/utils/router';

module('Unit | Utility | parseUrl', function () {
  test('should return the same string for string input', function (assert) {
    const urlString = 'http://www.example.com';
    assert.strictEqual(parseUrl(urlString), urlString);
  });

  test('should format a simple UrlObject', function (assert) {
    const urlObject = { pathname: '/path' };
    const expected = '/path';
    assert.strictEqual(parseUrl(urlObject), expected);
  });

  test('should format a UrlObject with auth and port', function (assert) {
    const urlObject = {
      auth: 'user:pass',
      hostname: 'www.example.com',
      port: 8080,
      pathname: '/path',
    };
    const expected = 'user:pass@www.example.com:8080/path';
    assert.strictEqual(parseUrl(urlObject), expected);
  });

  test('should handle a query string', function (assert) {
    const urlObject = {
      hostname: 'www.example.com',
      pathname: '/',
      query: 'str=hello',
    };
    const expected = 'www.example.com/?str=hello';
    assert.strictEqual(parseUrl(urlObject), expected);
  });

  test('should handle a query string starting with ?', function (assert) {
    const urlObject = {
      hostname: 'www.example.com',
      pathname: '/',
      query: '?str=hello',
    };
    const expected = 'www.example.com/?str=hello';
    assert.strictEqual(parseUrl(urlObject), expected);
  });

  test('should handle a query object', function (assert) {
    const urlObject = {
      hostname: 'www.example.com',
      pathname: '/',
      query: { str: 'hello', num: 123, bool: true, arr: ['one', 'two'] },
    };
    const expected =
      'www.example.com/?str=hello&num=123&bool=true&arr=one&arr=two';
    assert.strictEqual(parseUrl(urlObject), expected);
  });

  test('should correctly format a URL object with search instead of query', function (assert) {
    const urlObject = {
      hostname: 'www.example.com',
      pathname: '/',
      search: '?key=value&search=term',
    };
    const expected = 'www.example.com/?key=value&search=term';
    assert.strictEqual(parseUrl(urlObject), expected);
  });

  test('should handle URL object with both search and query properties', function (assert) {
    const urlObject = {
      hostname: 'www.example.com',
      pathname: '/',
      search: '?search=term',
      query: { key: 'value' }, // query should be ignored when search is present
    };
    const expected = 'www.example.com/?search=term';
    assert.strictEqual(parseUrl(urlObject), expected);
  });

  test('should append a hash', function (assert) {
    const urlObject = {
      pathname: '/path',
      hash: '#section',
    };
    const expected = '/path#section';
    assert.strictEqual(parseUrl(urlObject), expected);
  });

  test('should encode special characters in search', function (assert) {
    const urlObject = {
      host: 'www.example.com',
      pathname: '/',
      search: '?query=special#char&test=true',
    };
    const expected = 'www.example.com/?query=special%23char&test=true';
    assert.strictEqual(parseUrl(urlObject), expected);
  });
});
