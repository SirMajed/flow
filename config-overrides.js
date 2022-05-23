const { alias } = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@components': 'src/components',
    '@redux': 'src/redux',
    '@slices': 'src/redux/slices',
    '@fonts': 'public/fonts',
  })(config)

  return config
}
