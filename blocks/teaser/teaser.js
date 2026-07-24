
export default function decorate(block) {
  block.classList.add('teaser');

  const styleClass = block.dataset.style;
  if (styleClass) block.classList.add(styleClass);

  // --- IMAGE WRAPPER ---
  const rawImageContainer = block.children[0];
  const picture = rawImageContainer?.querySelector('picture');

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('image-wrapper');

  if (picture) {
    imageWrapper.appendChild(picture);
  }
  rawImageContainer.remove();
  block.prepend(imageWrapper);

  // --- CONTENT WRAPPER ---
  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('content-wrapper');

  // Move all remaining children into content wrapper
  while (block.children.length > 1) {
    contentWrapper.appendChild(block.children[1]);
  }

  block.appendChild(contentWrapper);

  // --- FLATTEN nested divs ---
  contentWrapper.querySelectorAll('div').forEach((div) => {
    if (div.children.length === 1 && div.children[0].tagName === 'DIV') {
      div.replaceWith(div.children[0]);
    }
  });

  // Normalize title
  const title = contentWrapper.querySelector('h2, p');
  if (title) title.classList.add('teaser-title');

  // Normalize subtitle
  const subtitle = contentWrapper.querySelector('.teaser-subtitle');
  if (!subtitle) {
    const p = contentWrapper.querySelector('p:nth-of-type(2)');
    if (p) p.classList.add('teaser-subtitle');
  }

  // Normalize description
  const desc = contentWrapper.querySelector('.teaser-description');
  if (!desc) {
    const p = contentWrapper.querySelector('p:nth-of-type(3)');
    if (p) p.classList.add('teaser-description');
  }
}
