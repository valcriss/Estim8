import express from 'express'
import mustacheExpress from 'mustache-express'
import session from 'express-session'
import path from 'path'
import dotenv from 'dotenv'

import indexRoutes from './routes/index'
import roomRoutes from './routes/room';

dotenv.config()

const app = express()

// Templating
app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', path.join(__dirname, 'templates'))

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'estim8-secret',
    resave: false,
    saveUninitialized: true
  })
)

// Routes
app.use('/', indexRoutes)
app.use('/room', roomRoutes);

export default app
