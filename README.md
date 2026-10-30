#How to install the project

Download the project
Open the project folder in vsCode.
check package json to see what dependencies are needed.
In the terminal install the dependencies
by typing:
npm install express
npm install morgan
npm install Nodemon
npm install slugify
npm install mongodb
npm install dotenv
Next install npm by typing npm install.

#How to run the server

in the terminal type npm start
the server will start running at 
http://localhost:3000

#What each API endpoint does

/ 
Loads the homepage at the root
/api
displays a json message showing that that api is running
/api/v1/items
Diplays all items in json with total of how many items their are
/api/v1/items/:id
Displays json for a specific product, identified by id number


#Any optional development command you created

Nodemon has been installed so express will automatically restart when changes are detected.

#Document all five CRUD endpoints.

##GET
/api/v1/items
Diplays all items in json with total of how many items their are

/api/v1/items/:id
Displays json for a specific product, identified by id number

##POST
/api/v1/items
Adds a new json item 

##PATCH
/api/v1/items/:id
Updates a json item for a specific id number 

##DELETE
/api/v1/items/:id
Deletes a specific json item using id number 


