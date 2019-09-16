FROM jolielang/jolie
ADD . /opt/ 
WORKDIR /opt/
RUN javac -classpath "lib/*:lib/build/*" java/accounts/JWTokens.java
RUN cd java && jar cfv ../lib/jwtokens.jar accounts/JWTokens.class && cd ..
CMD jolie -C "DatabaseLocation=\"mariadb\"" accounts.ol
# CMD ["/bin/sh"]
EXPOSE 8001