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

  // 3. Normalize title
  const title = block.querySelector('[data-aue-prop="textContent_title"]');
  title?.classList.add('teaser-title');

  // 4. Normalize subtitle
  const subtitle = block.querySelector('[data-aue-prop="textContent_subtitle"]');
  subtitle?.classList.add('teaser-subtitle');

  // 5. Normalize description
  const description = block.querySelector('[data-aue-prop="textContent_description"]');
  description?.classList.add('teaser-description');

  // 6. Normalize CTA
  const cta = block.querySelector('[data-aue-prop="textContent_cta"]');
  cta?.classList.add('teaser-cta');

  const ctaText = block.querySelector('[data-aue-prop="textContent_ctaText"]');
  ctaText?.classList.add('teaser-cta-text');
}
