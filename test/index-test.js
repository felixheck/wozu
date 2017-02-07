const test = require('ava')
const helpers = require('./helpers')
const wozu = require('../index')

test('throw error because of simple plain object', (t) => {
  t.throws(() => { wozu({}) }, SyntaxError)
})

test('throw error because of null', (t) => {
  t.throws(() => { wozu(null) }, SyntaxError)
})

test('throw error because of undefined', (t) => {
  t.throws(() => { wozu(undefined) }, SyntaxError)
})

test('throw error because of empty string', (t) => {
  t.throws(() => { wozu('') }, SyntaxError)
})

test('get all defined routes', (t) => {
  t.deepEqual(wozu(helpers.getServer()), [
    {
      method: 'get',
      path: '/foo'
    },
    {
      method: 'get',
      path: '/foo/{id}'
    },
    {
      method: 'post',
      path: '/foo'
    },
    {
      method: 'put',
      path: '/foo/{id}'
    },
    {
      method: 'patch',
      path: '/foo/{id}'
    },
    {
      method: 'delete',
      path: '/foo/{id}'
    }
  ])
})
