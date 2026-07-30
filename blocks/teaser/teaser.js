export default function decorate(block) {
  console.log('Decorating teaser block');
  block.classList.add('teaser');
  console.log('Teaser block:', block);
  console.log('Teaser block style class:', block.dataset.style);
  const styleClass = block.dataset.style;
  console.log('Teaser block style class variable:', styleClass);
  if (styleClass) block.classList.add(styleClass);

  const rows = [...block.children];
  console.log('Teaser block rows:', rows);
  const getCol = (row) => row?.children?.[0] || row;
  console.log('Teaser block getCol function:', getCol);
  const imageCol = getCol(rows[0]);
  const titleCol = getCol(rows[1]);
  const subtitleCol = getCol(rows[2]);
  const descCol = getCol(rows[3]);
  const ctaCol = getCol(rows[4]);
  console.log('Teaser block imageCol:', imageCol);
  console.log('Teaser block titleCol:', titleCol);
  console.log('Teaser block subtitleCol:', subtitleCol);
  console.log('Teaser block descCol:', descCol);
  console.log('Teaser block ctaCol:', ctaCol);

  const picture = imageCol?.querySelector('picture');
  const title = titleCol?.querySelector('p');
  const subtitle = subtitleCol?.querySelector('p');
  const description = descCol?.querySelector('p');
  const cta = ctaCol?.querySelector('p');

  // CLONE — never move original nodes
  const pictureClone = picture?.cloneNode(true);
  const titleClone = title?.cloneNode(true);
  const subtitleClone = subtitle?.cloneNode(true);
  const descriptionClone = description?.cloneNode(true);
  const ctaClone = cta?.cloneNode(true);

  // Build decorated wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'teaser-wrapper';

  // TITLE OUTSIDE TEXT WRAPPER
  if (titleClone) {
    titleClone.classList.add('teaser-title');
    wrapper.appendChild(titleClone);
  }

  const body = document.createElement('div');
  body.className = 'teaser-body';

  // IMAGE WRAPPER
  if (pictureClone) {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'image-wrapper';
    imageWrapper.appendChild(pictureClone);
    body.appendChild(imageWrapper);
  }

  // TEXT WRAPPER
  const textWrapper = document.createElement('div');
  textWrapper.className = 'text-wrapper';

  if (subtitleClone) {
    subtitleClone.classList.add('teaser-subtitle');
    textWrapper.appendChild(subtitleClone);
  }

  if (descriptionClone) {
    descriptionClone.classList.add('teaser-description');
    textWrapper.appendChild(descriptionClone);
  }

  if (ctaClone) {
    const ctaP = document.createElement('p');
    ctaP.classList.add('teaser-cta');
    ctaP.appendChild(ctaClone);
    textWrapper.appendChild(ctaP);
  }

  body.appendChild(textWrapper);
  wrapper.appendChild(body);

  // Append decorated wrapper WITHOUT deleting authoring DOM
  block.appendChild(wrapper);
}
