export default function decorate(block) {
  block.classList.add('teaser');

  const styleClass = block.dataset.style;
  if (styleClass) {
    block.classList.add(styleClass);
  }

  const imgWrapper = block.querySelector('.image-wrapper');
  const img = imgWrapper?.querySelector('img');

  const title = block.children[1]?.querySelector('p');
  const subtitle = block.children[2]?.querySelector('p');
  const description = block.children[3]?.querySelector('p');
  const cta = block.children[4]?.querySelector('a');

  // Add classes for styling
  title?.classList.add('teaser-title');
  subtitle?.classList.add('teaser-subtitle');
  description?.classList.add('teaser-description');
  cta?.classList.add('teaser-cta');
}
