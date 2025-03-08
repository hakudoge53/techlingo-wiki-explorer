
// Rollup configuration for bundling content scripts
const config = {
  input: 'public/content.js',
  output: {
    file: 'dist/content.js',
    format: 'iife'
  }
};

export default config;
