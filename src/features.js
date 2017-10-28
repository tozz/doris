/**
 *
 * A collection of feature detections required by Doris.
 */
export default {
  classListAddMultiple: (() => {
    const p = document.createElement('p');
    p.classList.add('x1', 'x2');
    return p.classList.contains('x2');
  })(),
};
