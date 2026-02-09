/**
 * Decorate the main-hero block
 * @param {Element} block - The main-hero block element
 */
export default function decorate(block) {
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

  // Create the content container
  const contentContainer = document.createElement('div');
  contentContainer.className = 'content';

  // Create the text content overlay
  const textContentOverlay = document.createElement('div');
  textContentOverlay.className = 'text-content';

  // Add title
  if (title) {
    const titleElement = document.createElement('h1');
    titleElement.className = 'title';
    titleElement.textContent = title.textContent;
    textContentOverlay.appendChild(titleElement);
  }

  contentContainer.appendChild(textContentOverlay);

  // Add description
  const firstParagraphElement = document.createElement('p');
  firstParagraphElement.className = 'subtitle';
  firstParagraphElement.textContent = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
  textContentOverlay.appendChild(firstParagraphElement);
  const secondParagraphElement = document.createElement('p');
  secondParagraphElement.className = 'description';
  secondParagraphElement.textContent = 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.';
  textContentOverlay.appendChild(secondParagraphElement);

  // Create the buttons content container
  const buttonContentContainer = document.createElement('div');
  buttonContentContainer.className = 'buttons-content';

  // Add button
  const button = document.createElement('a');
  button.className = 'button';
  button.href = '#';
  button.textContent = ctaText;
  buttonContentContainer.appendChild(button);
  contentContainer.appendChild(buttonContentContainer);

  // Assemble the block
  block.appendChild(backgroundContainer);
  block.appendChild(contentContainer);
}
