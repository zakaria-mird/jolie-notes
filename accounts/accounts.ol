execution { concurrent }

include "database.iol"
include "time.iol"
include "console.iol"
include "AccountsInterface.iol"
include "JWTokensInterface.iol"

constants {
  ServiceLocation = "socket://localhost:8001/",
  DatabaseLocation = "localhost",
  Secret = "([-s}ILVnl)^#XK9obzCI~t)ciYrSnhrdb-ac,-2d~t/I]8xUyja0$9T%mIf"
}

outputPort JWTokens {
  Interfaces: JWTokensInterface
}

embedded {
  Java: "accounts.JWTokens" in JWTokens
}

inputPort AccountsPort {
  Location: ServiceLocation
  Protocol: http { 
    .addHeader.header[0] << "Access-Control-Allow-Origin" { .value="*" }
    .method = "post" 
  }
  Interfaces: AccountsInterface
}

init {

  with(connectionInfo) {
    .username = "root";
    .password = "pass";
    .host = DatabaseLocation; 
    .database = "accounts";
    .driver = "mysql"
  }

  connect@Database(connectionInfo)();
  println@Console("Connected to the database...")();

  scope(createTable) {
    install( SQLException => println@Console("Table user already present into the database...")());
    updateRequest = "CREATE TABLE users(username VARCHAR(50) NOT NULL PRIMARY KEY, password VARCHAR(50) NOT NULL)";
    update@Database(updateRequest)(ret);
    println@Console("Created table user.")()
  }

  scope(createTable) {
    install(SQLException => println@Console("Table user_tokens already present into the database...")());
    updateRequest = "CREATE TABLE user_tokens(username VARCHAR(50), token VARCHAR(200), expiration VARCHAR(200), " +
      "FOREIGN KEY(username) REFERENCES users(username))";
    update@Database(updateRequest)(ret);
    println@Console("Created table user_tokens.")()
  }

  scope (updateData) {
    install(SQLException => println@Console("User already present into the database...")());
    updateRequest = "INSERT INTO users(username,password) VALUES (:username, :password)";
    updateRequest.username = "hello";
    updateRequest.password = "world";
    update@Database(updateRequest)(ret);
    println@Console("Inserted user into database.")()
  }
  
  close@Database()()
}

main {

  [login( request )( response ) {
    /* Connection to database */
    with(connectionInfo) {
      .username = "root";
      .password = "pass";
      .host = DatabaseLocation; 
      .database = "accounts";
      .driver = "mysql"
    }
    connect@Database(connectionInfo)();

    /* Variable initialization */
    username = request.username;
    password = request.password;
    actualPassword = "";
    user_found = false;

    println@Console("Received request to login for user " + username + " with password " + password)();

    /* Query the database */
    scope(queryData) {
      install(SQLException => println@Console("Error: Failed to query the database.")());
      queryRequest = "SELECT username, password FROM users WHERE username=:username";
      queryRequest.username = username;
      query@Database(queryRequest)(queryResponse);
      actualPassword = queryResponse.row[0].password;
      user_found = true
    }
    
    /* Check for correct password, username has already been checked by the query */
    if ( password == actualPassword && user_found) {
      println@Console("User " + username + " successfully logged in...")()
      
      /* Generate jwt token   */
      encodeTokenRequest.secret = Secret;
      encodeTokenRequest.username = "hello";
      EncodeToken@JWTokens(encodeTokenRequest)(encodeTokenResponse);
      println@Console("Generated new token: " + encodeTokenResponse.token)();
  
      response.success = true;
      response.auth_token = encodeTokenResponse.token
    }
    else {
      println@Console("User " + username + " failed to login...")();
      response.success = false;
      response.auth_token = ""
    }
    close@Database()()
  }]

  [verifyToken(request)(response) {
    /* Connection to database */
    with(connectionInfo) {
      .username = "root";
      .password = "pass";
      .host = DatabaseLocation; 
      .database = "accounts";
      .driver = "mysql"
    }
    connect@Database(connectionInfo)();

    /* Variable initialization */
    token = request.token;

    println@Console("Received request to validate token " + token)();

    /* Decode token */
    decodeTokenRequest.secret = Secret;
    decodeTokenRequest.token = token;
    DecodeToken@JWTokens(decodeTokenRequest)(decodeTokenResponse);
     
    username = decodeTokenResponse.username;
    if ( decodeTokenResponse.success == "false" ) {
      response.success = false;
      response.username = "";
      println@Console("Failed to verify token")()
    }
    else {
      response.success = true;
      response.username = username;
      println@Console("Verified token from user " + username)()
    }
    close@Database()()
  }]

}
