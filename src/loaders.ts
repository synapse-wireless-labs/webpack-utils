import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

export function createPreLoaders(): any[] {
  return [
    {
      test: /\.js$/,
      loaders: 'eslint', exclude: /(bower_components|node_modules)/
    }
  ];
}


export function createLoaders(config: {
  production: boolean,
  pathToIndexHtml: string,
  language: 'typescript' | 'es6' | 'mixed',
  css: boolean
}): any[] {

  const tsLoader = {
    test: /\.ts$/,
    loader: 'awesome-typescript',
    exclude: /node_modules/
  };

  const es6Loader = {
    test: /\.js$/,
    loader: 'babel',
    exclude: /(bower_components|node_modules)/
  };

  const languageLoaders = {
    typescript: [ tsLoader ],
    es6: [ es6Loader ],
    mixed: [ tsLoader, es6Loader ]
  };

  return [
    ...languageLoaders[config.language],
    {
      test: /\.css$/,
      loader: config.production ?
        ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        }) : 'style!css'
    },
    {
      test: /\.scss$/,
      loader: config.production ?
        ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?module!sass-loader'
        }) : 'style-loader!css-loader?module!sass-loader'
    },
    {
      test: /\.html$/,
      loader: 'raw-loader',
      exclude: [
        config.pathToIndexHtml
      ]
    },
    {
      test: /\.html$/,
      loader: 'html?attrs[]=link:href&attrs[]=img:src',
      include: [
        config.pathToIndexHtml
      ]
    },
    {
      test: /\.txt$/,
      loader: 'raw-loader'
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /(\.png?$|\.jpg?$|\.jpeg?$|\.svg?$|\.eot?$|\.ttf?$|\.woff?$|\.woff2?$|\.wav?$|\.mp3?$|\.ico?$)/,
      loader: 'file'
    }
  ]
}
