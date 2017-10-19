const hapi = require('hapi')
const wozu = require('../index')

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
      vhost: 'foohost.com',
      handler () {}
    }
  ])
}

function getServer () {
  const server = hapi.server({
    host: '127.0.0.1',
    port: 1337
  })

  setRoutes(server)
  server.register(wozu)

  return server
}

module.exports = {
  getServer
}
