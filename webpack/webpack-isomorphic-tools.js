var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

// see this link for more info on what all of this means
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
module.exports = {

  // when adding "js" extension to asset types 
  // and then enabling debug mode, it may cause a weird error:
  //
  // [0] npm run start-prod exited with code 1
  // Sending SIGTERM to other processes..
  //
  // debug: true, 

  assets: {
    md: {
      extensions: ['md', 'markdown'],
      include: [
        /^\.\/src\/*/,
      ]
    },
    json: {
      extensions: ['json', 'topojson', 'geojson'],
      include: [
        /^\.\/src\/*/,
      ]
    },
    images: {
      extensions: [
        'jpeg',
        'jpg',
        'png',
        'gif',
        'svg',
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    fonts: {
      extensions: [
        'woff',
        'woff2',
        'ttf',
        'eot'
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    styles: {
      extensions: ['css', 'less','scss'],
      filter: function(module, regex, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        }
      },
      path: WebpackIsomorphicToolsPlugin.style_loader_path_extractor,
      parser: WebpackIsomorphicToolsPlugin.css_loader_parser
    }
  }
}
