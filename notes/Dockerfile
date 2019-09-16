FROM jolielang/jolie
ADD . /opt/ 
WORKDIR /opt/
CMD jolie -C "DatabaseLocation=\"mariadb\"" -C "AccountsLocation=\"socket://accounts:8001\"" notes.ol
EXPOSE 8002
