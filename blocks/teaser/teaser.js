export default function decorate(block) {
  block.classList.add('teaser');

  const styleClass = block.dataset.style;
  if (styleClass) block.classList.add(styleClass);

  const rows = [...block.children];

  // Extract columns (DA always wraps content in col 0)
  const imageCol = rows[0]?.children[0];
  const titleCol = rows[1]?.children[0];
  const subtitleCol = rows[2]?.children[0];
  const descCol = rows[3]?.children[0];
  const ctaCol = rows[4]?.children[0];

  // Extract actual elements
  const picture = imageCol?.querySelector('picture');
  const title = titleCol?.querySelector('h1, h2, h3');
  const subtitle = subtitleCol?.querySelector('p');
  const description = descCol?.querySelector('p');
  const cta = ctaCol?.querySelector('a');

  // Clear block
  block.innerHTML = '';

  /* -------------------------------------------
     TITLE (full width)
     ------------------------------------------- */
  if (title) {
    title.classList.add('teaser-title');
    block.appendChild(title);
  }

  /* -------------------------------------------
     BODY (image + text)
     ------------------------------------------- */
  const body = document.createElement('div');
  body.className = 'teaser-body';

  /* IMAGE WRAPPER */
  if (picture) {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'image-wrapper';
    imageWrapper.appendChild(picture);
    body.appendChild(imageWrapper);
  }

  /* TEXT WRAPPER */
  const textWrapper = document.createElement('div');
  textWrapper.className = 'text-wrapper';

  if (subtitle) {
    subtitle.classList.add('teaser-subtitle');
    textWrapper.appendChild(subtitle);
  }

  if (description) {
    description.classList.add('teaser-description');
    textWrapper.appendChild(description);
  }

  if (cta) {
    const ctaP = document.createElement('p');
    ctaP.classList.add('teaser-cta');
    ctaP.appendChild(cta);
    textWrapper.appendChild(ctaP);
  }

  body.appendChild(textWrapper);
  block.appendChild(body);
}
