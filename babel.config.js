module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@/api': './src/api',
            '@/assets': './src/assets',
            '@/components': './src/components',
            '@/locales': './locales',
            '@/navigators': './src/navigators',
            '@/screens': './src/screens',
            '@/services': './src/services',
            '@/styles': './src/styles',
            '@/utilities': './src/utilities',
          },
        },
      ],
    ],
    env: {
      development: {
        plugins: [
          [
            'inline-dotenv',
            {
              path: './envs/.env.development',
            },
          ],
        ],
      },
      production: {
        plugins: [
          [
            'inline-dotenv',
            {
              path: './envs/.env.production',
            },
          ],
        ],
      },
    },
  };
};
