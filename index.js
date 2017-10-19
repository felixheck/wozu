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
 * @param {Object} route The current route object
 * @returns {string} Serialized route object
 */
function serialize (route) {
  return `${route.path}:${route.method}`
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
  console.log(host); // foohost.com

  return server.table(host).map(({ path, method }) => ({ path, method }))
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
async function wozu (server, pluginOptions) {
  server.decorate('server', 'wozu', (host) => decorator(server, host))
}

module.exports = {
  register: wozu,
  list: decorator,
  pkg
}
