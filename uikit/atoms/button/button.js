/* eslint-disable import/no-extraneous-dependencies */
import { h } from 'preact';
import htm from 'htm';

const html = htm.bind(h);

/**
 * Button - Reusable button component
 *
 * @param {Object} props - Component properties
 * @param {string} props.type - Button type: 'red' or 'blue' (default: 'red')
 * @param {Function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 * @param {*} props.children - Button content
 * @param {Object} props.rest - Other button attributes
 */
export const Button = ({
  type = 'red',
  onClick,
  className = '',
  children,
  ...rest
}) => {
  // Determine background color based on type
  const bgColor = type === 'red' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600';

  // Combine classes
  const buttonClasses = `${bgColor} text-white px-4 py-2 rounded transition-colors ${className}`;

  return html`
    <button
      class=${buttonClasses}
      onClick=${onClick}
      ...${rest}
    >
      ${children}
    </button>
  `;
};

export default Button;
