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

  it('Should append a node using a string representation', function() {
    doris('#test-5').append('<div class="dom-added" id="appended-1"></div>');
    doris('#test-5').append('<div class="dom-added" id="appended-2"></div>');
    expect(doris('#test-5').find(':first-child').attribute('id')).to.equal('appended-1');
    doris('#test-5').after('<div id="empty-testing-area"></div>');
    doris('#empty-testing-area').append('<div id="test-node"></div>');
    expect(doris('#empty-testing-area').find('*').get(0).id).to.equal('test-node');
    doris('#empty-testing-area').remove();
  });

  it('Should append a node using a dom representation', function() {
    var node = document.createElement('p');
    node.id = 'appended-dom-1';
    doris('#test-5').append(node);
    expect(doris('#test-5 p').attribute('id')).to.equal('appended-dom-1');
  });

  it('Should append a node using a Doris representation', function() {
    var a = doris('<div id="doris-appended"></div>');
    doris('#test-5').append(a);
    expect(doris('#test-5 div:last-child').attribute('id')).to.equal('doris-appended');
  });

  it('Should prepend a node using a string representation', function() {
    doris('#test-5').prepend('<div class="dom-added" id="prepended-1"></div>');
    expect(doris('#test-5').find('.dom-added').get(0).id).to.equal('prepended-1');
    doris('#test-5').after('<div id="empty-testing-area"></div>');
    doris('#empty-testing-area').prepend('<div id="test-node"></div>');
    expect(doris('#empty-testing-area').find('*')[0].id).to.equal('test-node');
    doris('#empty-testing-area').remove();
  });

  it('Should prepend a node using a dom representation', function() {
    var node = document.createElement('p');
    node.id = 'prepended-dom-1';
    doris('#test-5').prepend(node);
    expect(doris('#test-5 p').attribute('id')).to.equal('prepended-dom-1');
  });

  it('Should add a node by string representation before another', function() {
    doris('#appended-2').before('<div class="dom-added" id="before-1"></div>');
    expect(doris('#test-5').find('.dom-added').get(2).id).to.equal('before-1');
  });

  it('Should add a node by dom representation before another', function() {
    var node = document.createElement('p');
    node.id = 'before-dom-1';
    node.classList.add('dom-added');
    doris('#appended-2').before(node);
    expect(doris('#test-5').find('.dom-added').get(3).id).to.equal('before-dom-1');
  });

  it('Should add a node by string representation after another', function() {
    doris('#before-1').after('<div class="dom-added" id="after-1"></div>');
    expect(doris('#test-5').find('.dom-added').get(3).id).to.equal('after-1');
  });

  it('Should add a node by dom representation after another', function() {
    var node = document.createElement('p');
    node.id = 'after-dom-1';
    node.classList.add('dom-added');
    doris('#before-1').after(node);
    expect(doris('#test-5').find('.dom-added').get(3).id).to.equal('after-dom-1');
  });

  it('Should create a doris object when supplied with a non-valid CSS selector string', function() {
    var d = doris('<div id="first"><div id="second"><div id="third"></div></div></div>');
    expect(d.get(0).id).to.equal('first');
    expect(d.find('#second').attribute('id')).to.equal('second');
    expect(d.find('#third').attribute('id')).to.equal('third');
  });

  it('Should return a string representation of the markup when calling toHTML()', function() {
    var d = doris('#test-to-string');
    expect(d.toHTML()).to.equal('<div id="test-to-string"><div id="tts1"><div id="tts2"></div></div><div id="tts3"></div></div>');
    var d = doris('<div id="tts1"></div><div id="tts2"></div>');
    expect(d.toHTML()).to.equal('<div id="tts1"></div><div id="tts2"></div>');
  });

  it('Should replace a single node with a single replacement node', function() {
    var d = doris('#test-replace-1');
    var r = doris('<div id="test-replace-new"></div>');
    d.replace(r);
    expect(doris('#test-replace').find('#test-replace-1').elements.length).to.equal(0);
  });

  it('Should replace multiple nodes with a single replacement node', function() {
    var d = doris('.test-replace-many-single');
    var r = doris('<div class="test-replace-many-single-replaced"></div>');
    d.replace(r);
    expect(doris('#test-replace').find('.test-replace-many-single').elements.length).to.equal(0);
    expect(doris('#test-replace').find('.test-replace-many-single-replaced').elements.length).to.equal(2);
  });

  it('Should replace multiple nodes with multiple replacement nodes', function() {
    var d = doris('.test-replace-many-many');
    var r = doris('<div class="test-replace-many-many-replaced"><p>Hej</p></div><div class="test-replace-many-many-replaced"></div>');
    var n = d.replace(r);
    expect(doris('#test-replace').find('.test-replace-many-many').elements.length).to.equal(0);
    expect(doris('#test-replace').find('.test-replace-many-many-replaced').elements.length).to.equal(4);
    expect(n.elements.length).to.equal(4);
  });

  it('Should set the innerHTML when using a string with html()', function() {
    expect(doris('#test-html').html('<p>test</p>').get(0).innerHTML).to.equal('<p>test</p>');
  });

  it('Should set the innerHTML when using a node with html()', function() {
    var x = document.createElement('span');
    x.innerHTML = 'test';
    expect(doris('#test-html').html(x).get(0).innerHTML).to.equal('<span>test</span>');
  });

  it('Should return innerHTML when using html() without an argument', function() {
    doris('#test-html').html('<p>test</p>');
    expect(doris('#test-html').html()).to.equal('<p>test</p>');
  });

  it('Should set the textContent with text()', function() {
    doris('#test-text').text('<p>markup should be text</p>');
    expect(doris('#test-text').get(0).textContent).to.equal('<p>markup should be text</p>');
  });

  it('Should get the textContent of all matching elements with text()', function() {
    expect(doris('.test-text').text()).to.equal('abc');
  });

  it('Should set the textContent of all matching elements with text()', function() {
    doris('.test-text').text('a');
    expect(doris('.test-text').text()).to.equal('aaa');
  });
});

describe('CSS', function() {
  it('Should read a style', function() {
    expect(doris('#test-css').css('color')).to.equal('rgb(255, 0, 0)');
  });

  it('Should set a style', function() {
    doris('#test-css').css('font-size', '10px');
    expect(doris('#test-css').css('font-size')).to.equal('10px');
  });

  it('Should overwrite a style', function() {
    doris('#test-css').css('color', 'green');
    expect(doris('#test-css').css('color')).to.equal('rgb(0, 128, 0)');
  });

  it('Should set multiple styles', function() {
    doris('#test-css').css({
      'font-size': '11px',
      color: 'black',
      visibility: 'hidden'
    });
    expect(doris('#test-css').css('font-size')).to.equal('11px');
    expect(doris('#test-css').css('color')).to.equal('rgb(0, 0, 0)');
    expect(doris('#test-css').css('visibility')).to.equal('hidden');
  });
});
