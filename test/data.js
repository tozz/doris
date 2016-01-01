var expect = chai.expect;
var should = chai.should();

describe('Data values', function() {
  it('Should read data attributes', function() {
    expect(doris('#data-node').data('foo')).to.equal('test-f');
    expect(doris('#data-node').data('fooBar')).to.equal('test-fb');
    expect(doris('#data-node').data('foo-bar')).to.equal('test-fb');
  });

  it('Should set dataset values', function() {
    doris('#data-node').data('foo', 'test2-f');
    doris('#data-node').data('fooBar', 'test2-fb');
    expect(doris('#data-node').data('foo')).to.equal('test2-f');
    expect(doris('#data-node').data('foo-bar')).to.equal('test2-fb');
  });

  it('Should not read data attributes with invalid names', function() {
    expect(doris('#data-node').data('invalidKey')).to.equal(undefined);
    expect(doris('#data-node').data('invalid-key')).to.equal(undefined);
  });
});
