var express     = require('express'),
    morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    stylus      = require('stylus'),
    mongoose    = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

// Database stuff
if (env === 'development') {
    mongoose.connect('mongodb://localhost/multivision');
} else {
    mongoose.connect('mongodb://root:toor@ds033877.mongolab.com:33877/heroku_app26175662');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error...'));
db.once('open', function callback() {
    console.log('multivision db opened');
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc) {
    mongoMessage = messageDoc.message;
});


// Routes
app.get('/partials/:partialPath', function(req, res) {
   res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res) {
    res.render('index', {
        mongoMessage: mongoMessage
    });
});


// Listen to connections
var port = process.env.PORT || 3030;
app.listen(port);
console.log("Listening on port " + port);