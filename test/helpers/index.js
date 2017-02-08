const hapi = require('hapi')
const wozu = require('../../index')

function registerPlugin (server) {
  server.register(wozu, () => {})
}

function setConnections (server, multiple) {
  server.connection({
    host: '127.0.0.1',
    port: 1337,
    labels: ['a']
  })

  if (multiple) {
    server.connection({
      host: '0.0.0.0',
      port: 1338,
      labels: ['b']
    })
  }
}

function setRoutes (server, multiple) {
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

  if (multiple) {
    server.select('b').route({
      method: 'GET',
      path: '/foo/b',
      handler () {}
    })
  }
}

function getServer (multiple = false) {
  const server = new hapi.Server()

  setConnections(server, multiple)
  setRoutes(server, multiple)
  registerPlugin(server)

  return server
}

module.exports = {
  getServer,
  registerPlugin
}
