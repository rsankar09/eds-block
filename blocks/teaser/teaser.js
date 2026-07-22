/**
 * Extracts block option classes (excluding base classes).
 */
function getOptions(block) {
  return [...block.classList].filter((c) => !['block', 'teaser'].includes(c));
}

/**
 * Adds CTA hover zoom effect.
 */
function addEventListeners(block) {
  const button = block.querySelector('.button');
  const image = block.querySelector('.image');

  if (!button || !image) return;

  button.addEventListener('mouseover', () => {
    image.classList.add('zoom');
  });

  button.addEventListener('mouseout', () => {
    image.classList.remove('zoom');
  });
}

/**
 * Main block decorator.
 */
export default function decorate(block) {
  /* ---------------------------------------------------------
     1. Read UE attribute (data-style)
     --------------------------------------------------------- */
  const styleValue = block.dataset.style || 'default';

  /* ---------------------------------------------------------
     2. Remove ALL old layout classes
     --------------------------------------------------------- */
  ['default', 'side-by-side', 'image-on-left', 'image-on-right']
    .forEach(cls => block.classList.remove(cls));

  /* ---------------------------------------------------------
     3. Apply the new class
     --------------------------------------------------------- */
  block.classList.add(styleValue);

  /* ---------------------------------------------------------
     4. DA-visible node for storing style
     --------------------------------------------------------- */
  let styleNode = block.querySelector('.teaser-style');
  if (!styleNode) {
    styleNode = document.createElement('div');
    styleNode.className = 'teaser-style';
    block.prepend(styleNode);
  }
  styleNode.dataset.style = styleValue;

  /* ---------------------------------------------------------
     5. Common DOM treatments
     --------------------------------------------------------- */
  block.querySelector(':scope > div:last-child')?.classList.add('content');
  block.querySelector('h1,h2,h3,h4,h5,h6')?.classList.add('title');
  block.querySelector('img')?.classList.add('image');

  block.querySelectorAll('p').forEach((p) => {
    const innerHTML = p.innerHTML?.trim();
    if (innerHTML?.startsWith('Terms and conditions:')) {
      p.classList.add('terms-and-conditions');
    }
  });

  /* ---------------------------------------------------------
     6. Layout-specific wrappers
     --------------------------------------------------------- */
  const options = getOptions(block);

  if (options.includes('side-by-side')) {
    block.querySelector(':scope > div:first-child')?.classList.add('image-wrapper');
  } else if (options.includes('image-on-left')) {
    block.classList.add('image-left');
    block.querySelector(':scope > div:first-child')?.classList.add('image-wrapper');
  } else if (options.includes('image-on-right')) {
    block.classList.add('image-right');
    block.querySelector(':scope > div:first-child')?.classList.add('image-wrapper');
  } else if (options.includes('default')) {
    block.querySelector('picture')?.classList.add('image-wrapper');
  }

  /* ---------------------------------------------------------
     7. CTA hover zoom effect
     --------------------------------------------------------- */
  addEventListeners(block);

  /* ---------------------------------------------------------
     8. UE sync: watch for data-style changes
     --------------------------------------------------------- */
  const observer = new MutationObserver(() => {
    const newStyle = block.dataset.style || 'default';

    // Remove old classes
    ['default', 'side-by-side', 'image-on-left', 'image-on-right']
      .forEach(cls => block.classList.remove(cls));

    // Apply new class
    block.classList.add(newStyle);

    // Sync DA node
    styleNode.dataset.style = newStyle;
  });

  observer.observe(block, { attributes: true, attributeFilter: ['data-style'] });
}
