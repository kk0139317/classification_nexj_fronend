const path = require('path');

module.exports = {
  reactStrictMode: true,
  server: {
    https: {
      key: path.resolve('./certificates/key.pem'),   // Path to your private key file
      cert: path.resolve('./certificates/cert.pem'), // Path to your certificate file
    },
  },
};
