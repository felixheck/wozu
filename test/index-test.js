const test = require('ava')
const helpers = require('./helpers')

test('throw error if plugin gets registered twice', (t) => {
  const server = helpers.getServer()

  t.throws(() => helpers.registerPlugin(server), Error)
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
  const server = helpers.getServer(false)

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

test('get list of routes of two connections', (t) => {
  const server = helpers.getServer(true)

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
      path: '/foo/b'
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

test('get list of routes of selected connection | 1st', (t) => {
  const server = helpers.getServer(true)

  t.deepEqual(server.wozu('a'), [
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

test('get list of routes of selected connection | 2nd', (t) => {
  const server = helpers.getServer(true)

  t.deepEqual(server.wozu('b'), [
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
      path: '/foo/b'
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
