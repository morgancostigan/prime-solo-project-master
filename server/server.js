
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const beerRouter = require('./routes/beer.router');
const breweryRouter = require('./routes/brewery.router');
const tagRouter = require('./routes/tag.router');
const calendarRouter = require('./routes/calendar.router')
const followsRouter = require('./routes/follows.router');
const searchRouter = require('./routes/search.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/beer', beerRouter);
app.use('/api/tags', tagRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api/follows', followsRouter)
app.use('/api/breweries', breweryRouter)
app.use('/api/search', searchRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
