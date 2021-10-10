module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/addon-a11y',
    'storybook-dark-mode',
    'storybook-addon-jsx',
    'storybook-addon-pseudo-states'
  ],
  webpackFinal: async (config) => {
    // Configure react-native-web aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
      '@storybook/react-native': '@storybook/react',
    };

    return config;
  },
}