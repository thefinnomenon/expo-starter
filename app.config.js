export default {
  expo: {
    name: "expo-starter",
    slug: "expo-starter",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/icon.png",
    splash: {
      image: "./src/assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: {
            organization: process.env.SENTRY_ORGANIZATION,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
            setCommits: true,
            deployEnv: process.env.NODE_ENV,
          }
        }
      ]
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/adaptive-icon.png",
       backgroundColor: "#FFFFFF"
      }
    },
    web: {
      favicon: "./src/assets/favicon.png"
    },
    plugins: [
      "sentry-expo"
    ]
  }
}
