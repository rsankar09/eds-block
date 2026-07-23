export default function decorate(block) {
  block.classList.add('teaser');

  const styleClass = block.dataset.style;
  if (styleClass) {
    block.classList.add(styleClass);
  }

  const imgWrapper = block.querySelector('.image-wrapper');
  const img = imgWrapper?.querySelector('img');

  const title = block.children[1];
  const subtitle = block.children[2];
  const description = block.children[3];
  const ctaWrapper = block.children[4];
  const cta = ctaWrapper?.querySelector('a');

  // Defensive checks
  if (!imgWrapper || !img) return;

  // Add classes for styling
  title?.classList.add('teaser-title');
  subtitle?.classList.add('teaser-subtitle');
  description?.classList.add('teaser-description');
  ctaWrapper?.classList.add('teaser-cta');
}
