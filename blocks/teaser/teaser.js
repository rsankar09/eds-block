export default function decorate(block) {
  console.log('Teaser block decoration ');
  console.log('Block:',block);
  block.classList.add('teaser');  
  console.log(block.dataset);
  console.log(block.dataset.style);
  const styleClass = block.dataset.style;
  if (styleClass) block.classList.add(styleClass);

  const rows = [...block.children];

  const getCol = (row) => row?.children?.[0] || row;

  const imageCol = getCol(rows[0]);
  console.log('Image Column:', imageCol);
  const titleCol = getCol(rows[1]);
  console.log('Title Column:', titleCol);
  const subtitleCol = getCol(rows[2]);
  console.log('Subtitle Column:', subtitleCol);
  const descCol = getCol(rows[3]);
  console.log('Description Column:', descCol);
  const ctaCol = getCol(rows[4]);
  console.log('CTA Column:', ctaCol);
  console.log(imageCol, titleCol, subtitleCol, descCol, ctaCol);    

  console.log('Rows:', rows);
  const picture = imageCol?.querySelector('picture');
//   const title = titleCol?.querySelector('h1, h2, h3') || block.querySelector('h1, h2, h3')
  const title = titleCol?.querySelector('p'); 
  console.log('Title:', title);
  const subtitle = subtitleCol?.querySelector('p');
  console.log('Subtitle:', subtitle);
  const description = descCol?.querySelector('p');
  console.log('Description:', description);
  const cta = ctaCol?.querySelector('p');
  console.log('CTA:', cta);

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
//------------------------------------

// export default function decorate(block) {
//   console.log('Teaser block decoration');

//   block.classList.add('teaser');

//   const styleClass = block.dataset.style;
//   if (styleClass) block.classList.add(styleClass);

//   // ORIGINAL AUTHORING STRUCTURE (DA depends on this)
//   const rows = [...block.children];

//   const getCol = (row) => row?.children?.[0] || row;

//   const imageCol = getCol(rows[0]);
//   const titleCol = getCol(rows[1]);
//   const subtitleCol = getCol(rows[2]);
//   const descCol = getCol(rows[3]);
//   const ctaCol = getCol(rows[4]);

//   // Extract original <p> elements
//   const picture = imageCol?.querySelector('picture');
//   const title = titleCol?.querySelector('p');
//   const subtitle = subtitleCol?.querySelector('p');
//   const description = descCol?.querySelector('p');
//   const cta = ctaCol?.querySelector('p');

//   // IMPORTANT: CLONE instead of moving
//   const titleClone = title ? title.cloneNode(true) : null;
//   const subtitleClone = subtitle ? subtitle.cloneNode(true) : null;
//   const descriptionClone = description ? description.cloneNode(true) : null;
//   const ctaClone = cta ? cta.cloneNode(true) : null;

//   // Clear block for decorated output
//   block.innerHTML = '';

//   // TITLE OUTSIDE TEXT-WRAPPER
//   if (titleClone) {
//     titleClone.classList.add('teaser-title');
//     block.appendChild(titleClone);
//   }

//   // BODY WRAPPER
//   const body = document.createElement('div');
//   body.className = 'teaser-body';

//   // IMAGE WRAPPER
//   if (picture) {
//     const imageWrapper = document.createElement('div');
//     imageWrapper.className = 'image-wrapper';
//     imageWrapper.appendChild(picture.cloneNode(true));
//     body.appendChild(imageWrapper);
//   }

//   // TEXT WRAPPER
//   const textWrapper = document.createElement('div');
//   textWrapper.className = 'text-wrapper';

//   if (subtitleClone) {
//     subtitleClone.classList.add('teaser-subtitle');
//     textWrapper.appendChild(subtitleClone);
//   }

//   if (descriptionClone) {
//     descriptionClone.classList.add('teaser-description');
//     textWrapper.appendChild(descriptionClone);
//   }

//   if (ctaClone) {
//     const ctaP = document.createElement('p');
//     ctaP.classList.add('teaser-cta');
//     ctaP.appendChild(ctaClone);
//     textWrapper.appendChild(ctaP);
//   }

//   body.appendChild(textWrapper);
//   block.appendChild(body);
// }
