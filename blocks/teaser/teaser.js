export default function decorate(block) {
  block.classList.add('teaser');

  const styleClass = block.dataset.style;
  if (styleClass) block.classList.add(styleClass);

  // 1. Detect image wrapper
  const firstChild = block.children[0];
  const imgWrapper = firstChild?.querySelector('.image-wrapper');
  const img = imgWrapper?.querySelector('img');

  // 2. Remove empty image wrapper if no image exists
  if (!img) {
    firstChild.remove();
  }

  // Normalize title
  const titleWrapper = block.children[1];
  const titleP = titleWrapper?.querySelector('p');
  if (titleP) {
    titleP.classList.add('teaser-title');
    titleWrapper.replaceWith(titleP);
  }

  // Normalize subtitle
  const subtitleWrapper = block.children[2];
  const subtitleP = subtitleWrapper?.querySelector('p');
  if (subtitleP) {
    subtitleP.classList.add('teaser-subtitle');
    subtitleWrapper.replaceWith(subtitleP);
  }

  // Normalize description
  const descWrapper = block.children[3];
  const descP = descWrapper?.querySelector('p');
  if (descP) {
    descP.classList.add('teaser-description');
    descWrapper.replaceWith(descP);
  }

  // CTA (if present)
  const ctaWrapper = block.children[4];
  const cta = ctaWrapper?.querySelector('a');
  if (cta) {
    cta.classList.add('teaser-cta');
    ctaWrapper.replaceWith(cta);
  }
}
