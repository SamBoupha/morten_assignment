const passport = require( 'passport' );
const BasicStrategy = require( 'passport-http' ).BasicStrategy;

passport.use( new BasicStrategy( (username, password, done) => {
  if ( username !== password ) {
    return done( {
      status: "ERROR",
      message: "Invalid username/password combination"
    } )
  }

  return done( null, {
    username
  } )
} ) );

module.exports = {
  passport
};