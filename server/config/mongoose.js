var mongoose    = require('mongoose'),
    crypto      = require('crypto');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error! '));
    db.once('open', function callback() {
        console.log('multivision db opened');
    });

    // User schema
    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String,
        salt: String,
        hash: String,
        roles: [String]
    });
    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hash;
        }
    }
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
       if(collection.length === 0) {
            function mkPwd(user) {
                var salt, hash;
                salt = createSalt();
                hash = hashPwd(salt, user.userName);
                user.salt = salt;
                user.hash = hash;
                return user;
            }

            User.create(mkPwd({firstName: 'Joshua', lastName: 'Hutt', userName: 'joshua', roles: ['admin']}));
            User.create(mkPwd({firstName: 'Joe', lastName: 'Eames', userName: 'joe', roles: ['admin']}));
            User.create(mkPwd({firstName: 'John', lastName: 'Papa', userName: 'john'}));
       }
    });
};

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}