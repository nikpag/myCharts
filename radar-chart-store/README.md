# MICROSERVICE

## Scatter Chart Store

This is the microservice that receives all the scatter charts plots and stores them in a MongoDB DBMS. As of right now, to set up MongoDB follow the link "https://www.mongodb.com/try/download/community". Also, for the microservice to work you need to have NodeJS installed, instructions given here "https://nodejs.org/en/download". 

*Note:* If you want to run the project once and every time you make changes, it reruns automatically you can use the "npm run dev" command. Otherwise use "npm run start".

Even though it is not necessary, MongoDB offers MongoDB Compass, a useful tool for your MongoDB (https://www.mongodb.com/try/download/compass). When downloaded, as all the DBMS in this project are local when opening the app, just click on "Connect" button and you will be presented with the MongoDB DBs you have set up.

This microservice includes two API calls:
- a post method '/upload' (in the link "http://localhost:{PORT}/api/{chart name}/upload") which given as parameters:
    - username
    - filename
    - filetype
    - creation_timestamp
    - file
stores the file along with the parameters given (to test this API call, Postman is recommended). The above mentioned parameters should be given in the **body** of the call and not as parameters. 
*Note:* for filetype the mimetype should be given (as seen here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) and if the filetype parameter does not agree with the type of file given, an error will be thrown

- a get method '/get_charts' (in the link http://localhost:{PORT}/api/{chart_name}/get_charts/{username_you_are_looking_for}) that returns all the decuments stored with the given username.

In this file, there is also a **.env** file that includes PORT, MONGODB_URI and chart name. If one wishes to use different port, the changes should be done in this file.