var expect = chai.expect;
var should = chai.should();

describe('Events', function() {
  it('Should bind click events on elements', function() {
    var x = 0;
    doris('#test-3').on('click', function() { x += 1; });
    doris('#test-3').trigger('click');
    expect(x).to.equal(1);
  });

  it('Should bind click events on elements with an options object', function() {
    var x = 0;
    doris('#test-3').on('click', function() { x += 1; }, { passive: true });
    doris('#test-3').trigger('click');
    expect(x).to.equal(1);
  });

  it('Should bind click events using selectors (delegation)', function() {
    var x = 0;
    doris('#test-1').on('click', '#test-3', function() { x += 1; });
    doris('#test-3').trigger('click');
    expect(x).to.equal(1);
  });

  it('Should bind click events using selectors (delegation) with an options object', function() {
    var x = 0;
    doris('#test-1').on('click', '#test-3', function() { x += 1; }, { passive: true });
    doris('#test-3').trigger('click');
    expect(x).to.equal(1);
  });

  it('Should only fire once using once()', function() {
    var x = 0;
    var y = 0;
    doris('#test-1').once('click', '#test-3', function() { x += 1; });
    doris('#test-3').trigger('click').trigger('click');
    doris('#test-3').trigger('click');
    expect(x).to.equal(1);
    var f = function() { y += 1; };
    doris(document).once('click', f);
    doris(document).trigger('click');
    doris(document).trigger('click');
    expect(y).to.equal(1);
  });

  it('Should only remove one event listeners matching the selector when no callback is given', function() {
    var x = 0;
    doris(document).on('click', '#test-1', function() { x += 1; });
    doris(document).on('click', '#test-2', function(e) { x += 1; });
    doris(document).on('click', '#test-3', function() { x += 1; });
    doris(document).off('click', '#test-3');
    doris('#test-3').trigger('click');
    expect(x).to.equal(2);
  });

  it('Should not fire when calling off()', function() {
    var x = 0;
    var f = function() { x += 1; };
    var f1 = function() { x += 5; };
    var f2 = function() { x += 2; };
    doris('#test-1').on('click', '#test-3', f);
    doris('#test-1').off('click', '#test-3', f);
    doris('#test-2').on('click', f);
    doris('#test-2').on('click', function() { x+= 1; });
    doris('#test-2').off('click');
    doris('#test-2').trigger('click');
    doris('#test-3').trigger('click');
    expect(x).to.equal(0);
    doris('#test-1').on('click', f2);
    doris('#test-1').on('click', f2);
    doris('#test-1').trigger('click');
    expect(x).to.equal(4);
    doris('#test-1').off('click', f2);
    doris('#test-1').on('click', f1);
    doris('#test-1').trigger('click');
    expect(x).to.equal(9);
  });

  it('Should not trigger default events when calling preventDefault()', function() {
    expect(doris('#test-check:not(:checked)').elements.length).to.equal(1);
    doris('#test-check:not(:checked)').on('click', function(e) {
      e.preventDefault();
    });
    doris('#test-check:not(:checked)').trigger('click')
    expect(doris('#test-check:not(:checked)').elements.length).to.equal(1);
  });

  it('Should trigger a click event', function() {
    doris('#test-check2').trigger('click');
    expect(doris('#test-check2:checked').elements.length).to.equal(1);
  });

  it('Should not bubble when calling stopPropagation()', function() {
    var x = 0;
    doris('body').on('click', function() { x += 1; });
    doris('#test-1').on('click', function(e) { e.stopPropagation(); x += 1; });
    doris('#test-1').trigger('click');
    expect(x).to.equal(1);
  });

  it('Should stop immediately when calling stopImmediatePropagation() and the order the events were added should be honored', function() {
    var x = 0;
    doris('#test-1').on('click', function(e) { x += 1; });
    doris('#test-1').on('click', function(e) { e.stopImmediatePropagation(); x += 2; });
    doris('#test-1').on('click', function(e) { x += 4; });
    doris('#test-1').trigger('click');
    expect(x).to.equal(3);
  });
});
