/**
 * Decorate the main banner block
 * @param {Element} block - The main banner block element
 */
export default function decorate(block) {
  // Extract content from block rows
  const rows = [...block.children];

  // Extract title (row 1)
  const titleRow = rows[0];
  const titleElement = titleRow?.querySelector('h1, h2, h3, h4, h5, h6');
  const titleText = titleElement?.textContent?.trim();
  const titleTag = titleElement?.tagName.toLowerCase() || 'h2';

  // Extract description (row 2)
  const descriptionRow = rows[1];
  const descriptionElement = descriptionRow?.querySelector('p');
  const descriptionText = descriptionElement?.textContent?.trim();

  // Extract CTA (row 3)
  const ctaRow = rows[2];
  const ctaLink = ctaRow?.querySelector('a');
  const ctaText = ctaLink?.textContent?.trim();
  const ctaHref = ctaLink?.getAttribute('href');

  // Clear the block
  block.innerHTML = '';

  // Create content container
  const contentContainer = document.createElement('div');
  contentContainer.className = 'main-banner-content';

  // Add title if present
  if (titleText) {
    const title = document.createElement(titleTag);
    title.className = 'main-banner-title';
    title.textContent = titleText;
    contentContainer.appendChild(title);
  }

  // Add description if present
  if (descriptionText) {
    const description = document.createElement('p');
    description.className = 'main-banner-description';
    description.textContent = descriptionText;
    contentContainer.appendChild(description);
  }

  // Add CTA if present with valid href
  if (ctaText && ctaHref) {
    const cta = document.createElement('a');
    cta.className = 'main-banner-cta button';
    cta.href = ctaHref;
    cta.textContent = ctaText;
    contentContainer.appendChild(cta);
  } else if (ctaText) {
    // CTA text without link - render as non-clickable text
    const ctaDisabled = document.createElement('span');
    ctaDisabled.className = 'main-banner-cta button disabled';
    ctaDisabled.textContent = ctaText;
    contentContainer.appendChild(ctaDisabled);
  }

  // Add content container to block
  block.appendChild(contentContainer);
}
