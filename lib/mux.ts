// lib/mux.js
const { Video } = require('@mux/mux-node');

const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = process.env; // Store these in environment variables

const mux = new Video({
  accessToken: MUX_TOKEN_ID,
  secret: MUX_TOKEN_SECRET,
});

module.exports = mux;
