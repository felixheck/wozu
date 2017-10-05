const _ = require('lodash')
const pkg = require('./package.json')

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
  return `${route.method}:${route.path}`
}

/**
 * @function
 * @private
 *
 * @description
 * Get all routes per entry in server table
 *
 * @param {Object} entry The related entry of server table
 * @returns {Array.<?Object>} List of routes
 */
function getRoutes (entry) {
  return entry.table.map(({ path, method }) => ({ path, method }))
}

/**
 * @function
 * @public
 *
 * @description
 * Get flattened list of all defined routes
 *
 * @returns {Array.<?Object>} Flattened list of routes
 */
function decorator (server) {
  const routeList = _.flatten(server.table().map(getRoutes))
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
  server.decorate('server', 'wozu', () => decorator(server))
}

wozu.attributes = {
  pkg
}

module.exports = {
  register: wozu,
  list: decorator
}
