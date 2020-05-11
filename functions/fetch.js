const faunadb = require('faunadb')
const q = faunadb.query

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })
  /* parse the string body into a useable JS object */
  console.log('Function `fetch` invoked', JSON.stringify(event.queryStringParameters))
  query = event.queryStringParameters
  /* construct the fauna query */
  return client.query(q.Get(q.Match((q.Index('tokens_by_key'), query.key))))
    .then((response) => {
      console.log('success', response)
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        headers: {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(response.data)
      }
    }).catch((error) => {
      console.log('error', error)
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        headers: {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(error)
      }
    })
}
