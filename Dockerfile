FROM tomcat:latest 

COPY ./build/ ./webapps/ROOT

EXPOSE 8080
