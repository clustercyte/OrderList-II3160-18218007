const jwt = require('jsonwebtoken')
const config = require('config')
const { OAuth2Client } = require('google-auth-library')
const client_id = config.get('client_id')

async function auth (req, res, next) {
  const token = req.header('x-auth-token')
  if (!token) return res.status(401).json({ msg: 'No token sent' })
  try {
    await verify(token)
    next()
  } catch (e) {
    return res.status(401).json({ msg: 'token invalid' })
  }
}

async function verify (token) {
  const client = new OAuth2Client(client_id)
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: client_id
  })
  const payload = ticket.getPayload()
  const userid = payload['sub']
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}

module.exports = auth
