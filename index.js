const _ = require('lodash')
const joi = require('joi')
const pkg = require('./package.json')

/**
 * @function
 * @private
 *
 * Validate the plugin's options
 *
 * @param {string} host The host to filter by virtual host
 * @throws The options are invalid
 */
function validate (host) {
  joi.assert(host, joi.string().min(1).optional(), 'The parameter `host` is invalid. Its')
}

/**
 * @function
 * @private
 *
 * @description
 * Serialize route object for further processing
 *
 * @param {string} path The current route path
 * @param {string} method The current route method
 * @param {string} [vhost='*'] The current route vhost
 * @returns {string} Serialized route object
 */
function serialize ({ path, method, vhost = '*' }) {
  return `${path}:${method}:${vhost}`
}

/**
 * @function
 * @private
 *
 * @description
 * Get all routes in server table
 *
 * @param {hapi.Server} server The related hapi server instance
 * @param {string} host The host to filter by virtual host
 * @returns {Array.<?Object>} List of routes
 */
function getRoutes (server, host) {
  return server.table(host).map(({ path, method, settings: { vhost } }) => {
    return {
      path,
      method,
      ...(vhost ? { vhost } : {})
    }
  })
}

/**
 * @function
 * @public
 *
 * @description
 * Get sort list of all defined routes
 *
 * @param {hapi.Server} server The related hapi server instance
 * @param {Array} rest The additional arguments passed
 * @returns {Array.<?Object>} Flattened list of routes
 */
function decorator (server, ...rest) {
  validate(...rest)

  const routeList = getRoutes(server, ...rest);
  const sorted = _.sortBy(routeList, serialize)

  return _.sortedUniqBy(sorted, serialize)
}

/**
 * @function
 * @public
 *
 * @description
 * Plugin to get list of defined routes
 *
 * @param {hapi.Server} server The related hapi server instance
 * @param {Object} pluginOptions The plugin options
 */
function wozu (server, pluginOptions) {
  server.decorate('server', 'wozu', (host) => decorator(server, host))
}

module.exports = {
  register: wozu,
  list: decorator,
  pkg
}
