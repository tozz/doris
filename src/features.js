'use strict';

/**
 *
 * A collection of feature detections required by Doris.
 */
export default {
  classListAddMultiple: (_ => {
    let p = document.createElement('p');
    p.classList.add('x1','x2');
    return p.classList.contains('x2');
  })()
}
