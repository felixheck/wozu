const test = require('ava')
const helpers = require('./_helpers')
const wozu = require('../index')

const sortedList = [
  {
    method: 'delete',
    path: '/foo/{id}',
    vhost: '2.foohost.com',
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
    method: 'put',
    path: '/foo/{id}'
  },
  {
    method: 'get',
    path: '/foo'
  },
  {
    method: 'post',
    path: '/foo'
  }
]

test.beforeEach((t) => {
  t.context.server = helpers.getServer()
})

test('throw error if plugin gets registered twice', async (t) => {
  const err = await t.throws(t.context.server.register(wozu))

  t.truthy(err)
  t.is(err.message, 'Plugin wozu already registered')
})

test('throw error because `labels` is invalid', (t) => {
  const server = helpers.getServer(false)

  t.throws(() => server.wozu(42), Error)
  t.throws(() => server.wozu(null), Error)
  t.throws(() => server.wozu({}), Error)
  t.throws(() => server.wozu(''), Error)
  t.throws(() => server.wozu([]), Error)
  t.throws(() => server.wozu([42]), Error)
})

test('get list of routes of server', (t) => {
  t.deepEqual(t.context.server.wozu(), [{
    method: 'delete',
    path: '/foo/{id}',
    vhost: '1.foohost.com',
  }, ...sortedList])
})

test('get list of routes of server as util', (t) => {
  t.deepEqual(wozu.list(t.context.server), [{
    method: 'delete',
    path: '/foo/{id}',
    vhost: '1.foohost.com',
  }, ...sortedList])
})

test('get list of routes by selected vhost', (t) => {
  const server = helpers.getServer(true)

  t.deepEqual(server.wozu('2.foohost.com'), sortedList)
})

test('get list of routes by multiple selected vhosts', (t) => {
  const server = helpers.getServer(true)

  t.deepEqual(server.wozu(['1.foohost.com', '2.foohost.com']), [{
    method: 'delete',
    path: '/foo/{id}',
    vhost: '1.foohost.com',
  }, ...sortedList])
})
