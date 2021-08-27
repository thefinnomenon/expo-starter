const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async (env, argv) => {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve.alias = {
    ...config.resolve.alias,

    '@/api': path.resolve(__dirname, 'src/api/'),
    '@/assets': path.resolve(__dirname, 'src/assets/'),
    '@/components': path.resolve(__dirname, 'src/components/'),
    '@/locales': path.resolve(__dirname, 'locales/'),
    '@/navigators': path.resolve(__dirname, 'src/navigators/'),
    '@/screens': path.resolve(__dirname, 'src/screens/'),
    '@/services': path.resolve(__dirname, 'src/services/'),
    '@/styles': path.resolve(__dirname, 'src/styles/'),
    '@/utilities': path.resolve(__dirname, 'src/utilities/'),
  };

  return config;
};