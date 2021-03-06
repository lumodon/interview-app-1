import { addUserToRequestFromJWT } from '@learnersguild/idm-jwt-auth/lib/middlewares'
import { parseConfig, getEnv } from '../config/config'

const initialize = app => {
  if(getEnv() !== 'test' && !process.env.DISABLE_IDM) {
    if ( !process.env.JWT_PUBLIC_KEY ) {
      throw new Error(`You do not have a JWT_PUBLIC_KEY in your .env. Please add it.`)
    }
    app.use( addUserToRequestFromJWT )
    app.use( ensureUserLoggedIn )
  } else {
    app.use(fakeAuthForTesting)
  }
}

const fakeAuthForTesting = (req, res, next) => {
  req.user = {handle: 'fake-user', name: 'Ghost',}
  next()
}

const config = parseConfig()

const ensureUserLoggedIn = (req, res, next) => {
  const redirect = encodeURIComponent(config.redirect_url)
  if ( !req.user ) {
    return res.redirect(`${config.idm_url}/sign-in?redirect=${redirect}`)
  }
  next()
}

export default initialize
