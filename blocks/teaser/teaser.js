export default function decorate(block) {
  console.log('Block:',block);
  block.classList.add('teaser');  
  console.log(block.dataset);
  console.log(block.dataset.style);
  const styleClass = block.dataset.style;
  if (styleClass) block.classList.add(styleClass);

  const rows = [...block.children];

  const getCol = (row) => row?.children?.[0] || row;

  const imageCol = getCol(rows[0]);
  const titleCol = getCol(rows[1]);
  const subtitleCol = getCol(rows[2]);
  const descCol = getCol(rows[3]);
  const ctaCol = getCol(rows[4]);
  console.log(imageCol, titleCol, subtitleCol, descCol, ctaCol);    


  const picture = imageCol?.querySelector('picture');
//   const title = titleCol?.querySelector('h1, h2, h3') || block.querySelector('h1, h2, h3')
  const title = titleCol?.querySelector('p'); 
  const subtitle = subtitleCol?.querySelector('p');
  const description = descCol?.querySelector('p');
  const cta = ctaCol?.querySelector('p');

  block.innerHTML = '';

  // TITLE
  if (title) {
    title.classList.add('teaser-title');
    block.appendChild(title);
  }

  const body = document.createElement('div');
  body.className = 'teaser-body';

  // IMAGE WRAPPER
  if (picture) {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'image-wrapper';
    imageWrapper.appendChild(picture);
    body.appendChild(imageWrapper);
  }

  // TEXT WRAPPER
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
