const passport = require('passport');

module.exports = (app) => {

    app.get('/',(req, res) => {
        res.send({hello: 'there'});
    });

    app.get('/user1',(req, res) => {
        res.send({username: "Pranay"});
    });

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'public_profile']
    }));

    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/auth/facebook/callback', passport.authenticate('facebook'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
    
}