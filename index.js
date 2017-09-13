const express = require('express');
const bodyParser = require( 'body-parser' );
const morgan = require( 'morgan' );
const helmet = require( 'helmet' );
const uuid = require( 'uuid/v4' );
const { passport } = require('./utils/auth');
const excelReader = require('./utils/excel-reader');
const program = require( 'commander' );

const app = express();
app.enable( 'trust proxy' );
app.use( bodyParser.urlencoded( {extended: false} ) );
app.use( bodyParser.json() );
app.use( morgan( 'common' ) );
app.use( helmet() );
app.use( passport.initialize() );

app.get( '/', passport.authenticate('basic', {session: false} ), (req, res) => {
    res.json( excelReader() );
});

app.listen(8000, () => console.log("Server started at port 8000"));