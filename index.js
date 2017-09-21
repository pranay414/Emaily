const express = require('express');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
require('./models/User');
require('./services/passport');
const mongoose = require('mongoose');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);

app.use(passport.initialize());

app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("HTTP server running on port", PORT);
});