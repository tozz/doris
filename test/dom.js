var expect = chai.expect;
var should = chai.should();

describe('DOM Traversal', function() {
  it('Should find elements by id', function() {
    expect(doris('#test-1').elements.length).to.equal(1);
  });

  it('Should find elements by class name', function() {
    expect(doris('.a').elements.length).to.equal(2);
    expect(doris('.a.b').elements.length).to.equal(1);
  });

  it('Should find elements by id and class name', function() {
    expect(doris('#test-1.a').elements.length).to.equal(1);
    expect(doris('#test-1.b').elements.length).to.equal(0);
  });

  it('Should find parent elements', function() {
    expect(doris('#test-3').parent()[0].id).to.equal('test-2');
    expect(doris('#test-3').parent('#test-1')[0].id).to.equal('test-1');
  });

  it('Should not find duplicate parent elements', function() {
    expect(doris('.parent-test').parent('div').elements.length).to.equal(1);
  });

  it('Should find elements within the current scope', function() {
    expect(doris('#test-2').find('.nested').elements.length).to.equal(1);
    expect(doris('#test-1').find('.nested').elements.length).to.equal(2);
  });
});

describe('DOM Manipulation', function() {
  it('Should read attributes', function() {
    expect(doris('#test-1').attribute('id')).to.equal('test-1');
  });

  it('Should set attributes', function() {
    expect(doris('#test-1').attribute('href', 'test').attribute('href')).to.equal('test');
  });

  it('Should remove attributes when they\'re set to false', function() {
    expect(doris('#test-1')
      .attribute('href', 'test')
      .attribute('href', false)
      .attribute('href')).to.equal(null);
  });

  it('Should add a class', function() {
    expect(doris('#test-1').addClass('c4').attribute('class')).to.have.string('c4');
  });

  it('Should add many classes', function() {
    expect(doris('#test-1').addClass('c10', 'c20').attribute('class')).to.have.string('c10 c20');
  });

  it('Should remove a class', function() {
    expect(doris('#test-1').removeClass('c4').attribute('class')).to.not.have.string('c4');
  });

  it('Should remove many classes', function() {
    expect(doris('#test-1').removeClass('c10', 'c20').attribute('class')).to.equal('a c1 c2 c3');
  });

  it('Should toggle a class', function() {
    expect(doris('#test-1').toggleClass('t1').attribute('class')).to.have.string('t1');
    expect(doris('#test-1').toggleClass('t1').attribute('class')).to.not.have.string('t1');
  });
});
