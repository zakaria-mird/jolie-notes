# Simple notes
Simple webapp for taking notes written in jolie with a microservice architecture.

### Building the account service
From the accounts folder:
```
$ javac -classpath "lib/*:lib/build/*" java/accounts/JWTokens.java
$ cd java && jar cfv ../lib/jwtokens.jar accounts/JWTokens.class && cd ..
```