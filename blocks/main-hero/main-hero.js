/* eslint-disable no-console */

/**
 * Decorate the main-hero block
 * @param {Element} block - The main-hero block element
 */
export default function decorate(block) {
  console.info('Decorating main-hero block');
  console.info(block);

  // Extract content from the block structure
  const rows = [...block.children];

  // Get the image (first row)
  const imageRow = rows[0];
  const picture = imageRow?.querySelector('picture');

  // Get the title (second row)
  const titleRow = rows[1];
  const title = titleRow?.querySelector('h1');

  // Get button text (third row)
  const buttonRow = rows[2];
  const ctaTextEl = buttonRow?.querySelector('div');
  const ctaText = ctaTextEl?.textContent?.trim();

  // Clear the block and rebuild structure
  block.innerHTML = '';

  // Create the background image container
  const backgroundContainer = document.createElement('div');
  backgroundContainer.className = 'background';
  if (picture) {
    backgroundContainer.appendChild(picture);
  }

  // Create the content overlay container
  const contentContainer = document.createElement('div');
  contentContainer.className = 'content';

  // Create the left content box
  const contentBox = document.createElement('div');
  contentBox.className = 'box';

  // Add title
  if (title) {
    const titleElement = document.createElement('h1');
    titleElement.className = 'title';
    titleElement.textContent = title.textContent;
    contentBox.appendChild(titleElement);
  }

  // Add hardcoded subtitle
  const subtitle = document.createElement('p');
  subtitle.className = 'subtitle';
  subtitle.textContent = 'Aprovecha, reserva hoy y viaja hasta marzo de 2026.';
  contentBox.appendChild(subtitle);

  // Add hardcoded travel info section
  const travelInfo = document.createElement('div');
  travelInfo.className = 'travel-info';

  const travelLabel = document.createElement('span');
  travelLabel.className = 'travel-label';
  travelLabel.textContent = 'Trayecto desde';
  travelInfo.appendChild(travelLabel);

  const price = document.createElement('div');
  price.className = 'price';
  price.textContent = 'USD 240';
  travelInfo.appendChild(price);

  const route = document.createElement('div');
  route.className = 'route';
  route.textContent = 'Bogotá a Miami';
  travelInfo.appendChild(route);

  contentBox.appendChild(travelInfo);

  // Add reserve button
  const button = document.createElement('a');
  button.className = 'button';
  button.href = '#';
  button.textContent = ctaText;
  contentBox.appendChild(button);

  contentContainer.appendChild(contentBox);

  // Assemble the block
  block.appendChild(backgroundContainer);
  block.appendChild(contentContainer);
}
