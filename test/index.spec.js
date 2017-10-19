const test = require('ava')
const helpers = require('./_helpers')
const wozu = require('../index')

const sortedList = [
  {
    method: 'delete',
    path: '/foo/{id}'
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
  try {
    await t.context.server.register(wozu)
  } catch (err) {
    t.truthy(err)
    t.is(err.message, 'Plugin wozu already registered')
  }
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

test('get list of routes of single connection', (t) => {
  t.deepEqual(t.context.server.wozu(), sortedList)
})

test('get list of routes of single connection as util', (t) => {
  t.deepEqual(wozu.list(t.context.server), sortedList)
})

test('get list of selected routes', (t) => {
  const server = helpers.getServer(true)

  t.deepEqual(server.wozu('foohost.com'), [
    {
      method: 'delete',
      path: '/foo/{id}'
    }
  ])
})
