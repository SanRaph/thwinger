# Setup Process for Thwinger - Chat for Super Heroes
  ## Created by Raphael Sani (sanraph) @ Semicolon
* _Discuss Hero stuff_ <raphytex@gmail.com>

![thwinger icon](images/superhero.png)

**Thwinger**, the leading Chat Platform for *Super Heroes*

>Every Human is _Super Human_

### Full Steps
* Get user input on the client
* Send user input from the client with fetch to the server
* Store data in database
* Retrieve data from a server on the client using fetch
* Hide/show elements on the client
* Add elements to the page on the client
* Deploy the client with now.sh
* Deploy the database with mlab
* Deploy the server with now.sh

## frontend
* [x] Create a client folder
* [x] Setup index.html
* [x] Bring in Skeleton CSS
   * <https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css>
* [x] Create header 
* [x] create form
   * [x] Name 
   * [x] Content
   * [x] u-full-width
* [x] Listen for form submit
* [x] Load a spinner
* [x] Hide the form
* [x] Show loading spinner
* [x] Get data form and log it
* [x] Get user input on the client
* [x] Hide/Show elements on the client

## backend
* [x] create server folder
* [x] npm init y
* [x] install express morgan
* [x] Set-up index.js
* [x] Add GET '/' route
* [x] Add POST/ mews route
   * [x] log out req.body

## back to frontend to send data to server from user
* [x] fetch POST/ mews with formData
* [x] See CORS error
* [x] Send user input from client with fetch to server

## backend to process data
* [x] Install CORS
* [x] Make sure server is receiving data
* [x] Add JSON body-parser middleware
* [x] Validate name and content
   * [x] Must be a string
   * [x] Can not be empty
* [x] if not valid
   * [x] error code 422
   * [x] invalid mew, must contain name and content
* [x] set up DB connection
   * [x] npm install monk
   * [x] connect to db
   * [x] create document collection(mews)
* [x] if valid
   * [x] create mew object with
      * [x] name, content and created-date
   * [x] insert into db
   * [x] respond with created object
* [x] store data in the database

## front-end

* [x] log out createdmew after POST request
* [x] show the form
* [x] hide loading spinner

## backend 

* [x] GET /mews
* [x] respond with mews from DB
* [x] retrieve data from a database on the server

## frontend

* [x] fetch GET /mews
   * [x] iterate over array
   * [x] append each to page
   * [x] reverse before appending
   * [x] show the form
   * [x] hide loading spinner
* [x] fetch GET /mews after creating a mew
* [x] retrieve data from a server on the client using fetch
* [x] hide show elements on the client

## backend 

* [x] npm install bad-words
   * [x] use filter before inserting into database
* [x] npm install express-rate-limit
   * [x] limit to 1 request every 15 seconds


## Deploy 

* [x] deploy server with now
   * [x] set up environment variables
      * [x] database connection
         * process.env.MONGO_URI
   * show mlab
   * deploy with environment variable
     * now -e MONGO_URI=@meower-db
     * add alias
* deploy clien folder with now
  * [x] Set API_URL based on hostname

* link to front-end https://thwinger.now.sh 
* link to back-end  https://thwinger-api.now.sh
## What is next
