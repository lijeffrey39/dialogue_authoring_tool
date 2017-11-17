import 'draft-js-inline-toolbar-plugin/lib/plugin.css';

module.exports = function override(config, env) {
  config = {
    module: {
      loaders: [
        {
          test: /plugin\.css$/,
          loaders: [
            'style-loader', 'css',
          ],
        },
      ],
    },
  };
  return config;
}