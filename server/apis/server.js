//
const next = require('next'),
    express = require('express'),
    dev = process.env.NODE_ENV !== "production",
    port = process.env.PORT || 3000,
    app = next({dev}),
    compression = require('compression'),
    helmet = require("helmet"),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    handle = app.getRequestHandler(),
    mongoose = require('../../utils/mongoose'),
    constants = require('../../utils/constants')

//
mongoose.connect(constants.mongoUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('### Mongoose connected. Please wait until express is connected');

    //
    const drop = false
    if (drop) {
        db.dropDatabase()
        console.log("### Db dropped")
    }
});

//
console.log("### Preparing Express server. Please wait...")
app.prepare().then(() => {
    //
    const server = express()
    server.use(compression());
    server.use(helmet());
    server.use(cors());
    server.use(bodyParser.urlencoded({extended: false}));
    server.use(bodyParser.json());
    server.use(cookieParser());

    //
    server.use('/users', require('./users'));

    //
    server.get('*', (req, res) => {
        handle(req, res)
    })

    server.listen(port, err => {
        if (err) {
            throw err;
        }
        console.log("### Express connected! Server Listening at port: " + port)
    })
})