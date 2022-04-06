const {i18n} = require("./next-i18next.config");

const env = {
  FIREBASE_CONFIG: {
    apiKey: 'AIzaSyA_ufTaiDP6qL5qm_dtSQjBDUtsVzO-p0I',
    authDomain: 'remotion-22fde.firebaseapp.com',
    databaseURL: 'https://remotion-22fde-default-rtdb.firebaseio.com',
    projectId: 'remotion-22fde',
    storageBucket: 'remotion-22fde.appspot.com',
    messagingSenderId: '896277337533',
    appId: '1:896277337533:web:2edbb9191f88ed79e22ed4',
    measurementId: 'G-J4JZRL7M8G'
  },
  FIREBASE_USER: process.env.FIREBASE_USER,
  FIREBASE_PASS: process.env.FIREBASE_PASS,
  NEXT_PUBLIC_HOSTNAME: process.env.NEXT_PUBLIC_HOSTNAME
}

module.exports = {
  distDir: "nextjs",
  poweredByHeader: false,
  i18n,
  env,
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
