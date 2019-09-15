execution {concurrent}

include "database.iol"
include "console.iol"
include "NotesInterface.iol"
include "AccountsInterface.iol"

constants {
  AccountsLocation = "socket://localhost:8001/",
  DatabaseLocation = "localhost",
  ServiceLocation = "socket://localhost:8002/"
}

inputPort NotesPort {
  Location: ServiceLocation
  Protocol: http { 
    .addHeader.header[0] << "Access-Control-Allow-Origin" { .value="*"}
    .addHeader.header[1] << "Access-Control-Allow-Methods" { .value="GET,POST, PUT, DELETE, OPTIONS"}
    .addHeader.header[2] << "Access-Control-Allow-Headers" { .value="Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control"}
    .method = "post" 
  }
  Interfaces: NotesInterface
}

outputPort Accounts {
  Location: AccountsLocation
  Protocol: http {.method = "post"}
  Interfaces: AccountsInterface 
}

init {
  with(connectionInfo) {
    .username = "root";
    .password = "pass";
    .host = DatabaseLocation;
    .database = "notes";
    .driver = "mysql"
  }

  connect@Database(connectionInfo)();
  println@Console("Connected to the database...")();

  scope(createTable) {
    install( SQLException => println@Console("Table notes already present into the database...")());
    updateRequest = "CREATE TABLE notes(noteId INT NOT NULL AUTO_INCREMENT PRIMARY KEY," + 
      "username VARCHAR(50) NOT NULL,  title VARCHAR(200), content TEXT NOT NULL)";
    update@Database(updateRequest)(ret);
    println@Console("Created table notes.")()
  }
}

main {
  [delete(request)(response) {
    /* Connection to database */
    with(connectionInfo) {
      .username = "root";
      .password = "pass";
      .host = DatabaseLocation; 
      .database = "notes";
      .driver = "mysql"
    }
    connect@Database(connectionInfo)();

    /* Variable initialization */
    response.success = false;
    response.message = "Failed to delete note.";

    /* Query for user */ 
    verifyTokenRequest.token = request.token;
    verifyToken@Accounts(verifyTokenRequest)(verifyTokenResponse);
    username = verifyTokenResponse.username;
    success = verifyTokenResponse.success;

    if(success == "true") {
      scope (updateData) {
        install(SQLException => println@Console("Failed to delete note...")());
        updateRequest = "DELETE FROM notes WHERE noteId=:noteId";
        updateRequest.noteId = request.noteId;
        update@Database(updateRequest)(ret);
        println@Console("Deleted note of user " + username + ".")();
        response.success = true;
        response.message = "Note successfully deleted."
      }
    }
    else {
      response.success = false;
      response.message = "Failed to delete note"
    }
    close@Database()()
  }]

  [list(request)(response) {
    /* Connection to database */
    with(connectionInfo) {
      .username = "root";
      .password = "pass";
      .host = DatabaseLocation; 
      .database = "notes";
      .driver = "mysql"
    }
    connect@Database(connectionInfo)();

    /* Variable initialization */
    response.success = false;

    /* Query for user */ 
    verifyTokenRequest.token = request.token;
    verifyToken@Accounts(verifyTokenRequest)(verifyTokenResponse);
    username = verifyTokenResponse.username;
    success = verifyTokenResponse.success;

    if(success == "true") {
      scope(queryData) {
        install(SQLException => println@Console("Failed to query for note list...")());
        queryRequest = "SELECT noteId,title,content FROM notes WHERE username=:username";
        queryRequest.username = username;
        query@Database(queryRequest)(queryResponse);
        for(i = 0, i < #queryResponse.row, i++) {
          response.notes[i].noteId = queryResponse.row[i].noteId;
          response.notes[i].title = queryResponse.row[i].title;
          response.notes[i].content = queryResponse.row[i].content
        }
        response.success = true;
        println@Console("Satisfied request for note list.")()
      }
    }
    else {
      response.success = false;
      response.message = "Failed to retrieve notes"
    }
    close@Database()()
  }]

  [add(request)(response) {
    /* Connection to database */
    with(connectionInfo) {
      .username = "root";
      .password = "pass";
      .host = DatabaseLocation; 
      .database = "notes";
      .driver = "mysql"
    }
    connect@Database(connectionInfo)();

    /* Variable initialization */
    response.success = false;
    response.message = "Failed to create note.";

    /* Query for user */ 
    verifyTokenRequest.token = request.token;
    verifyToken@Accounts(verifyTokenRequest)(verifyTokenResponse);
    username = verifyTokenResponse.username;
    success = verifyTokenResponse.success;

    if(success == "true") {
      scope (updateData) {
        install(SQLException => println@Console("Failed to create note...")());
        updateRequest = "INSERT INTO notes(username,title,content) VALUES (:username,:title,:content)";
        updateRequest.username = "hello";
        updateRequest.title = request.title;
        updateRequest.content = request.content;
        update@Database(updateRequest)(ret);
        println@Console("Inserted note of user " + username + ".")();
        response.success = true;
        response.message = "Note successfully created."
      }
    }
    else {
      response.success = false;
      response.message = "Failed to create note"
    }
    close@Database()()
  }]
}

