let express = require('express');
const portfinder = require("portfinder");

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

(async () => {
  const PORT = process.env.PORT || await findPort();

  let webpackConfig = require('../../webpack.config.js');
  webpackConfig = webpackConfig({mode: "development", port: PORT, presets: []});

  const compiler = webpack(webpackConfig);

  let app = express();

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true
  }));
  app.use(webpackHotMiddleware(compiler));

  app.listen(PORT, () => {
    console.log(`Running app at http://localhost:${PORT}`);
    console.log("Press Ctrl+C to quit.");
  });
})();

async function findPort(start = 8000) {
  return await portfinder.getPortPromise({
    port: start,
  });
}
