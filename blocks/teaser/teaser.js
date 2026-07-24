export default function decorate(block) {
  block.classList.add('teaser');

  const styleClass = block.dataset.style;
  if (styleClass) block.classList.add(styleClass);

  // Extract header (first child)
  const headerWrapper = block.children[0];
  const header = headerWrapper.querySelector('h2, p');
  header.classList.add('teaser-title');
  block.appendChild(header);
  headerWrapper.remove();

  // Create teaser-body
  const body = document.createElement('div');
  body.classList.add('teaser-body');

  // Image wrapper
  const rawImageContainer = block.children[0];
  const picture = rawImageContainer.querySelector('picture');
  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('image-wrapper');
  imageWrapper.appendChild(picture);
  rawImageContainer.remove();

  // Text wrapper
  const textWrapper = document.createElement('div');
  textWrapper.classList.add('text-wrapper');

  // Move remaining content into text-wrapper
  while (block.children.length > 0) {
    textWrapper.appendChild(block.children[0]);
  }

  // Build final structure
  body.appendChild(imageWrapper);
  body.appendChild(textWrapper);
  block.appendChild(body);
}
