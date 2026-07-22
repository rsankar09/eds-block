// import { createOptimizedPicture } from '../../scripts/aem.js';

// export default function decorate(block) {
//   /* change to ul, li */
//   const ul = document.createElement('ul');
//   [...block.children].forEach((row) => {
//     const li = document.createElement('li');
//     while (row.firstElementChild) li.append(row.firstElementChild);
//     [...li.children].forEach((div) => {
//       if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
//       else div.className = 'cards-card-body';
//     });
//     ul.append(li);
//   });

//   // replace images with optimized versions
//   ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));

//   block.replaceChildren(ul);
// }

import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* ---------------------------------------------------------
     1. Read UE attributes (block.dataset.style)
     --------------------------------------------------------- */
  const styleValue = block.dataset.style || '';

  /* ---------------------------------------------------------
     2. Inject DA-visible node so DA can store/read style
        DA selector: .cards-style[data-style]
     --------------------------------------------------------- */
  const styleNode = document.createElement('div');
  styleNode.className = 'cards-style';
  styleNode.dataset.style = styleValue;
  block.prepend(styleNode);

  /* ---------------------------------------------------------
     3. Apply CSS class based on style
     --------------------------------------------------------- */
  if (styleValue) {
    block.classList.add(styleValue);   // <-- THIS activates .cards.home.block CSS
  }

  /* ---------------------------------------------------------
     4. Build UL/LI structure
     --------------------------------------------------------- */
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    if (row === styleNode) return; // skip our DA node

    const li = document.createElement('li');

    while (row.firstElementChild) {
      li.append(row.firstElementChild);
    }

    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
      }
    });

    ul.append(li);
  });

  /* ---------------------------------------------------------
     5. Replace images with optimized versions
     --------------------------------------------------------- */
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimized = createOptimizedPicture(
      img.src,
      img.alt,
      false,
      [{ width: '750' }]
    );
    img.closest('picture').replaceWith(optimized);
  });

  /* ---------------------------------------------------------
     6. Replace block children with UL + DA node
     --------------------------------------------------------- */
  block.replaceChildren(styleNode, ul);

  /* ---------------------------------------------------------
     7. Sync UE → DOM whenever UE updates block attributes
        (UE sets block.dataset.style)
     --------------------------------------------------------- */
  const observer = new MutationObserver(() => {
    const newStyle = block.dataset.style || '';

    // Update DA node
    if (newStyle !== styleNode.dataset.style) {
      styleNode.dataset.style = newStyle;
    }

    // Update CSS class
    block.classList.forEach((cls) => {
      if (cls !== 'block' && cls !== 'cards') {
        block.classList.remove(cls);
      }
    });

    if (newStyle) {
      block.classList.add(newStyle);
    }
  });

  observer.observe(block, { attributes: true, attributeFilter: ['data-style'] });
}
