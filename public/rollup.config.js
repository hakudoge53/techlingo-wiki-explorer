
// Rollup configuration for bundling content scripts
export default {
  input: 'public/content.js',
  output: {
    file: 'dist/content.js',
    format: 'iife'
  }
};
