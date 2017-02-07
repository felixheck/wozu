const hapi = require('hapi')

function getServer () {
  const server = new hapi.Server()

  server.connection({ port: 1337 })

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

  return server
}

module.exports = {
  getServer
}
