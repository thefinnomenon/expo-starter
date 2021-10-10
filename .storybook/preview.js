import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
const { addDecorator } = require('@storybook/react');
const { jsxDecorator } = require('storybook-addon-jsx');
import { DocsContainer } from './components/DocContainer';

addDecorator(jsxDecorator);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: { 
    disable: true 
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    stylePreview: true
  },
  // Docs dark mode fix [https://github.com/hipstersmoothie/storybook-dark-mode/issues/127#issuecomment-802018811]
  docs: {
    container: DocsContainer,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
}