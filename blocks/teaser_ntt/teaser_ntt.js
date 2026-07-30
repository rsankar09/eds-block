// import { createOptimizedPicture } from '../../scripts/aem.js';
// import { moveInstrumentation } from '../../scripts/scripts.js';

// export default function decorate(block) {
//   /* change to ul, li */
//   const ul = document.createElement('ul');
//   [...block.children].forEach((row) => {
//     const li = document.createElement('li');
//     moveInstrumentation(row, li);
//     while (row.firstElementChild) li.append(row.firstElementChild);
//     [...li.children].forEach((div) => {
//       if (div.children.length === 1 && div.querySelector('picture')) div.className = 'teaser-ntt-image';
//       else div.className = 'teaser-ntt-body';
//     });
//     ul.append(li);
//   });
//   ul.querySelectorAll('picture > img').forEach((img) => {
//     const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
//     moveInstrumentation(img, optimizedPic.querySelector('img'));
//     img.closest('picture').replaceWith(optimizedPic);
//   });
//   block.replaceChildren(ul);
// }


import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');

  const rows = [...block.children];

  // Extract original content
  const imageRow = rows[0];
  const titleRow = rows[1];
  const subtitleRow = rows[2];
  const descRow = rows[3];

  const picture = imageRow?.querySelector('picture');
  const title = titleRow?.querySelector('p');
  const subtitle = subtitleRow?.querySelector('p');
  const description = descRow?.querySelector('p');

  // Build LI
  const li = document.createElement('li');
  li.classList.add('teaser-ntt');

  // TITLE
  if (title) {
    const titleClone = title.cloneNode(true);
    titleClone.classList.add('teaser-title');
    li.appendChild(titleClone);
  }

  // BODY WRAPPER
  const body = document.createElement('div');
  body.className = 'teaser-body';

  // IMAGE WRAPPER
  if (picture) {
    const optimizedPic = createOptimizedPicture(
      picture.querySelector('img').src,
      picture.querySelector('img').alt,
      false,
      [{ width: '750' }]
    );

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'image-wrapper';
    imageWrapper.appendChild(optimizedPic);
    body.appendChild(imageWrapper);
  }

  // TEXT WRAPPER
  const textWrapper = document.createElement('div');
  textWrapper.className = 'text-wrapper';

  if (subtitle) {
    const subtitleClone = subtitle.cloneNode(true);
    subtitleClone.classList.add('teaser-subtitle');
    textWrapper.appendChild(subtitleClone);
  }

  if (description) {
    const descriptionClone = description.cloneNode(true);
    descriptionClone.classList.add('teaser-description');
    textWrapper.appendChild(descriptionClone);
  }

  body.appendChild(textWrapper);
  li.appendChild(body);

  ul.appendChild(li);

  block.replaceChildren(ul);
}
