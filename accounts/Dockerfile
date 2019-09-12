FROM jolielang/jolie
ADD . /home/ 
RUN cd /home/ && javac -classpath "lib/*:lib/build/*" java/accounts/JWTokens.java
RUN cd /home/ && cd java && jar cfv ../lib/jwtokens.jar accounts/JWTokens.class && cd ..
# CMD jolie accounts.ol
EXPOSE 8001
