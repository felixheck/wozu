const _ = require('lodash')
const joi = require('joi')
const pkg = require('./package.json')

/**
 * @type {Object}
 * @private
 *
 * @description
 * Store internal objects
 */
const internals = {
  cb: {
    serialize: (route) => `${route.method}:${route.path}`
  },
  scheme: {
    labels: joi.array().items(joi.string().min(1)).min(1).single()
  }
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
 * Plugin to get list of defined routes
 *
 * @param {hapi.Server} server The related hapi server instance
 * @param {Object} pluginOptions The plugin options
 * @param {Function} next The callback to continue in the chain of plugins
 */
function wozu (server, pluginOptions, next) {
  /**
   * @function
   * @public
   *
   * @description
   * Get flattened list of all defined routes
   *
   * @param {string | Array.<string>} [labels] Labels to select specific connections
   * @returns {Array.<?Object>} Flattened list of routes
   */
  server.decorate('server', 'wozu', function decorator (labels) {
    joi.assert(labels, internals.scheme.labels, 'The parameter "labels" is invalid. Its')

    const connections = labels ? server.select(labels) : server
    const routeList = _.flatten(connections.table().map(getRoutes))
    const sorted = _.sortBy(routeList, internals.cb.serialize)

    return _.sortedUniqBy(sorted, internals.cb.serialize)
  })

  next()
}

wozu.attributes = {
  pkg
}

module.exports = {
  register: wozu
}
