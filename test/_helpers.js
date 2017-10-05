const hapi = require('hapi')
const wozu = require('../index')

function registerPlugin (server) {
  server.register(wozu, () => {})
}

function setConnections (server) {
  server.connection({
    host: '127.0.0.1',
    port: 1337
  })
}

function setRoutes (server) {
  server.route([
    {
      method: 'GET',
      path: '/foo',
      handler () {}
    },
    {
      method: 'GET',
      path: '/foo/{id}',
      handler () {}
    },
    {
      method: 'POST',
      path: '/foo',
      handler () {}
    },
    {
      method: 'PUT',
      path: '/foo/{id}',
      handler () {}
    },
    {
      method: 'PATCH',
      path: '/foo/{id}',
      handler () {}
    },
    {
      method: 'DELETE',
      path: '/foo/{id}',
      handler () {}
    }
  ])
}

function getServer () {
  const server = new hapi.Server()

  setConnections(server)
  setRoutes(server)
  registerPlugin(server)

  return server
}

module.exports = {
  getServer,
  registerPlugin
}
