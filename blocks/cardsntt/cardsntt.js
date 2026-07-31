
import { createOptimizedPicture } from '../../scripts/aem.js';
// import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {

  /* ---------------------------------------------------------
     1. Read UE attributes (block.dataset.style)
     --------------------------------------------------------- */
  const styleValue = block.dataset.style || '';
  console.log('Style value:', styleValue);
  /* ---------------------------------------------------------
     2. Inject DA-visible node so DA can store/read style
        DA selector: .cards-style[data-style]
     --------------------------------------------------------- */
  const styleNode = document.createElement('div');
  styleNode.className = 'cards-style';
  styleNode.dataset.style = styleValue;
  block.prepend(styleNode);
  console.log('Injected style node:', styleNode);
  console.log('Block after injecting style node:', block);
  
  /* ---------------------------------------------------------
     3. Apply CSS class based on style
     --------------------------------------------------------- */
  if (styleValue) {
    block.classList.add(styleValue);   // <-- THIS activates .cards.home.block CSS
  }

  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    // moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    // moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.replaceChildren(ul);
}
