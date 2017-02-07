const _ = require('lodash')
const hapi = require('hapi')

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
 * @param {hapi.Server} server The related hapi server instance
 * @returns {Array.<?Object>} Flattened list of routes
 */
function wozu (server) {
  if (!server || !hapi.Server.prototype.isPrototypeOf(server)) {
    throw SyntaxError('The passed parameter have to be a `hapi.Server` instance.')
  }

  return _.flatten(server.table().map(getRoutes))
}

module.exports = wozu
