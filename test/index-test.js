const test = require('ava')
const helpers = require('./_helpers')
const wozu = require('../index')

test('throw error if plugin gets registered twice', (t) => {
  const server = helpers.getServer()

  t.throws(() => helpers.registerPlugin(server), Error)
})

test('get list of routes of single connection', (t) => {
  const server = helpers.getServer()

  t.deepEqual(server.wozu(), [
    {
      method: 'delete',
      path: '/foo/{id}'
    },
    {
      method: 'get',
      path: '/foo'
    },
    {
      method: 'get',
      path: '/foo/{id}'
    },
    {
      method: 'patch',
      path: '/foo/{id}'
    },
    {
      method: 'post',
      path: '/foo'
    },
    {
      method: 'put',
      path: '/foo/{id}'
    }
  ])
})

test('get list of routes of single connection as util', (t) => {
  const server = helpers.getServer()

  t.deepEqual(wozu.list(server), [
    {
      method: 'delete',
      path: '/foo/{id}'
    },
    {
      method: 'get',
      path: '/foo'
    },
    {
      method: 'get',
      path: '/foo/{id}'
    },
    {
      method: 'patch',
      path: '/foo/{id}'
    },
    {
      method: 'post',
      path: '/foo'
    },
    {
      method: 'put',
      path: '/foo/{id}'
    }
  ])
})
