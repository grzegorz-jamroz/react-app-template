let express = require('express');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

let webpackConfig = require('../../webpack.config.js');
webpackConfig = webpackConfig({mode: "development", presets: []});

const compiler = webpack(webpackConfig);

let app = express();

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  serverSideRender: true
}));
app.use(webpackHotMiddleware(compiler));

app.listen(4001, () => console.log('Example app listening on port 4001!'));
