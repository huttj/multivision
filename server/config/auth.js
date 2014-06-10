var passport = require('passport');

module.exports = {
    authenticate: function(req, res, next) {
        var auth = passport.authenticate('local', function(err, user) {
            if (err) return next(err);
            if (!user) res.send({success:false});

            // This is needed to log in with XHR
            req.logIn(user, function(err) {
                if (err) return next(err);

                // Pass the user to the client
                res.send({success:true, user: sanitize(user)});

            });
        });
        // Actually have to call the auth function
        auth(req, res, next);
    },
    sanitize: sanitize,
    requiresApiLogin: function(req, res, next) {
        if(!req.isAuthenticated()) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    },
    requiresRole: function(role) {
        return function(req, res, next) {
            if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
                res.status(403);
                res.end();
            } else {
                next();
            }
        }
    }
};

function sanitize(user /* props to hide */ ) {
    if(!!user) {
        // Null out the hidden properties of the user
        var hidden_props = [
            'salt',
            'hash'
        ];
        if (arguments.length>1) {
            hidden_props = hidden_props.concat([].slice.call(arguments, 1));
        }
        console.log([].slice.call(arguments, 1), hidden_props);
        for (var i = 0, l = hidden_props.length; i<l; i++) {
            user[hidden_props[i]] = undefined;
        }
    }
    return user;
}