var path = require('path');
var util = require('util');
var request = require('supertest');
var mdserver = require('../lib/server');

process.env.TEST = true;
describe('mdserver', function () {
  describe('default directory', function () {
    var server;
    before(function () {
      server = mdserver({
        silent: true
      });
    });

    it('request `/index.js` should get `200`', function (done) {
      request(server)
          .get('/index.js')
          .expect(200, done);
    });

    it('request `index.txt` should get `404`', function (done) {
      request(server)
          .get('/index.txt')
          .expect(404, done);
    });
  });

  describe('specify directory', function () {
    var server;
    before(function () {
      server = mdserver({
        silent: true,
        root: path.resolve(__dirname + '/fixtures'),
        style: '',
        ftpl: '{{style}}<div>{{content}}</div>'
      });
    });

    it('request `foo.txt` should get `200`', function (done) {
      request(server)
          .get('/foo.txt')
          .expect(200, 'foo\n', done);
    });
    it('request markdown files', function (done) {
      var wrap = '<div>%s</div>';
      request(server)
          .get('/bar.md')
          .expect(200, util.format(wrap, '<h1 id="h1">h1</h1>\n'), done);
    });
  });
});

