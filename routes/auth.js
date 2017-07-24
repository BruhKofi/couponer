/**
 * Add routes for authentication
 *
 * Also sets up dependencies for authentication:
 * - Adds sessions support to Express (with HTTP only cookies for security)
 * - Configures session store (defaults to a flat file store in /tmp/sessions)
 * - Adds protection for Cross Site Request Forgery attacks to all POST requests
 *
 * Normally some of this logic might be elsewhere (like server.js) but for the
 * purposes of this example all server logic related to authentication is here.
 */
'use strict'

const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const nodemailer = require('nodemailer')
const csrf = require('lusca').csrf()
const uuid = require('uuid/v4')
const passportStrategies = require('./passport-strategies')

exports.configure = ({
    app = null, // Next.js App
    server = null, // Express Server
    user: User = null, // User model
    // URL base path for authentication routes
    path = '/auth',
    // Directory in ./pages/ where auth pages can be found
    pages = 'auth',
    // Secret used to encrypt session data on the server
    secret = 'change-me',
    // Sessions store for express-session (defaults to /tmp/sessions file store)
    store = new FileStore({path: '/tmp/sessions', secret: secret}),
    // Max session age in ms (default is 4 weeks)
    // NB: With 'rolling: true' passed to session() the session expiry time will
    // be reset every time a user visits the site again before it expires.
    maxAge = 60000 * 60 * 24 * 7 * 4,
    // How often the client should revalidate the session in ms (default 60s)
    // Does not impact the session life on the server, but causes the client to
    // always refetch session info after N seconds has elapsed since last
    // checked. Sensible values are between 0 (always check the server) and a
    // few minutes.
    clientMaxAge = 60000,
    // URL of the server (e.g. 'http://www.example.com'). Used when sending
    // sign in links in emails. Autodetects to hostname if null.
    serverUrl = null,
    // Mailserver configuration for nodemailer (defaults to localhost if null)
    mailserver = null,
    // From email address should match email account specified in mailserver
    // or you may not be able to send emails.
    fromEmail = 'noreply@localhost.localdomain'
  } = {}) => {
  if (app === null) {
    throw new Error('app option must be a next server instance')
  }

  if (server === null) {
    throw new Error('server option must be an express server instance')
  }

  if (User === null) {
    throw new Error('user option must be a User model')
  }

  // Load body parser to handle POST requests
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({extended: true}))

  // Configure sessions
  server.use(session({
    secret: secret,
    store: store,
    resave: false,
    rolling: true,
    saveUninitialized: true,
    httpOnly: true,
    cookie: {
      maxAge: maxAge
    }
  }))

  // Add CSRF to all POST requests
  // (If you want to add exceptions to paths you can do that here)
  server.use(csrf)

  // With sessions connfigured (& before routes) we need to configure Passport
  // and trigger passport.initialize() before we add any routes
  passportStrategies.configure({
    app: app,
    server: server,
    user: User
  })

  // Add route to get CSRF token via AJAX
  server.get(path + '/csrf', (req, res) => {
    return res.json({csrfToken: res.locals._csrf})
  })

  // Return session info
  server.get(path + '/session', (req, res) => {
    let session = {
      clientMaxAge: clientMaxAge,
      csrfToken: res.locals._csrf
    }

    // Add user object to session if logged in
    if (req.user) {
      session.user = req.user
    }

    return res.json(session)
  })

  // On post request, redirect to page with instrutions to check email for link
  server.post(path + '/email/signin', (req, res) => {
    const email = req.body.email || null

    if (!email || email.trim() === '') {
      return app.render(req, res, pages + '/signin', req.params)
    }

    const token = uuid()
    const verificationUrl = (serverUrl || 'http://' + req.headers.host) + path + '/email/signin/' + token

    // Create verification token save it to database
    // @FIXME Improve error handling
    User.one({email: email}, function (err, user) {
      if (err) {
        throw err
      }
      if (user) {
        user.token = token
        user.save(function (err) {
          if (err) {
            throw err
          }

          sendVerificationEmail({
            mailserver: mailserver,
            fromEmail: fromEmail,
            toEmail: email,
            url: verificationUrl
          })
        })
      } else {
        User.create({email: email, token: token}, function (err) {
          if (err) {
            throw err
          }

          sendVerificationEmail({
            mailserver: mailserver,
            fromEmail: fromEmail,
            toEmail: email,
            url: verificationUrl
          })
        })
      }
    })

    return app.render(req, res, pages + '/check-email', req.params)
  })

  server.get(path + '/email/signin/:token', (req, res) => {
    if (!req.params.token) {
      return res.redirect(path + '/signin')
    }

    // Look up user by token
    User.one({token: req.params.token}, function (err, user) {
      if (err) {
        return res.redirect(path + '/error/email')
      }
      if (user) {
        // Reset token and mark as verified
        user.token = null
        user.verified = true
        user.save(function (err) {
          // @TODO Improve error handling
          if (err) {
            return res.redirect(path + '/error/email')
          }
          // Having validated to the token, we log the user with Passport
          req.logIn(user, function (err) {
            if (err) {
              return res.redirect(path + '/error/email')
            }
            return res.redirect(path + '/signin?action=signin_email')
          })
        })
      } else {
        return res.redirect(path + '/error/email')
      }
    })
  })

  server.post(path + '/signout', (req, res) => {
    // Log user out by disassociating their account from the session
    req.logout()
    res.redirect('/')
  })
}

// @TODO Argument validation
function sendVerificationEmail({mailserver, fromEmail, toEmail, url}) {
  nodemailer
  .createTransport(mailserver)
  .sendMail({
    to: toEmail,
    from: fromEmail,
    subject: 'Sign in link',
    text: 'Use the link below to sign in:\n\n' + url + '\n\n'
  }, function (err) {
    // @TODO Handle errors
    if (err) {
      console.log('Error sending email to ' + toEmail, err)
    }
  })
  // console.log('Generated sign in link ' + url + ' for ' + toEmail)
}
