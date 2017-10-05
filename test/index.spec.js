const test = require('ava')
const helpers = require('./_helpers')
const wozu = require('../index')

test.beforeEach((t) => {
	t.context.server = helpers.getServer();
});


test('throw error if plugin gets registered twice', async (t) => {
  try {
    await t.context.server.register(wozu)
  } catch (err) {
    t.truthy(err)
    t.is(err.message, 'Plugin wozu already registered')
  }
})

test('get list of routes of single connection', (t) => {
  t.deepEqual(t.context.server.wozu(), [
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
  t.deepEqual(wozu.list(t.context.server), [
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
