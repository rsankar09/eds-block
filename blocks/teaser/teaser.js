export default function decorate(block) {
  block.classList.add('teaser');

  const styleClass = block.dataset.style;
  if (styleClass) block.classList.add(styleClass);

  // Extract children by index
  const imageContainer = block.children[1];
  const titleContainer = block.children[2];
  const subtitleContainer = block.children[3];
  const descContainer = block.children[4];
  const ctaContainer = block.children[5];

  // --- TITLE (always full width) ---
  const title = titleContainer.querySelector('h2, p');
  title.classList.add('teaser-title');
  block.appendChild(title);

  // --- FLEX BODY ---
  const body = document.createElement('div');
  body.classList.add('teaser-body');

  // --- IMAGE WRAPPER ---
  const picture = imageContainer.querySelector('picture');
  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('image-wrapper');
  imageWrapper.appendChild(picture);

  // --- TEXT WRAPPER ---
  const textWrapper = document.createElement('div');
  textWrapper.classList.add('text-wrapper');

  // Subtitle
  const subtitle = subtitleContainer.querySelector('p');
  subtitle.classList.add('teaser-subtitle');
  textWrapper.appendChild(subtitle);

  // Description
  const desc = descContainer.querySelector('p');
  desc.classList.add('teaser-description');
  textWrapper.appendChild(desc);

  // CTA
  const cta = ctaContainer.querySelector('a');
  if (cta) {
    const ctaP = document.createElement('p');
    ctaP.classList.add('teaser-cta');
    ctaP.appendChild(cta);
    textWrapper.appendChild(ctaP);
  }

  // Build final structure
  body.appendChild(imageWrapper);
  body.appendChild(textWrapper);

  // Clear block and rebuild
  block.innerHTML = '';
  block.appendChild(title);
  block.appendChild(body);
}
