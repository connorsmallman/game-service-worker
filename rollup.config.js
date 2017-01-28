import babel from 'rollup-plugin-babel';

export default {
  entry: 'main.js',
  plugins: [
    babel()
  ],
  format: 'umd'
};
