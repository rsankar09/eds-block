
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

  
}
