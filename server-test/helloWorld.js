var should = require('should');
var app = require('../server/app');

describe('App', function(){
    it('should be present', function(){
        should.exist(app);
    })
})