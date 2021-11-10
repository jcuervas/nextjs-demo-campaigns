const {i18n} = require("./next-i18next.config");

const firebaseConfig = process.env.FIREBASE_CONFIG

module.exports = {
  distDir: "nextjs",
  poweredByHeader: false,
  i18n,
  env: {
    firebaseConfig,
    firebaseUser: 'public@remotion.es',
    firebasePass: 'PublicRemotion1'
  },
  experimental: {
    sprFlushToDisk: false,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.tsx?$/,
      use: 'ts-loader',
      include: "/node_modules/"
    });

    return config;
  }
};
