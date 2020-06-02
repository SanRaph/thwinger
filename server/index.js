//bring in express
const express = require('express');

//bring in CORS
const cors = require('cors');

//bring in monk and use it to talk to mongodb
const monk = require('monk');

//bring in bad-words
const Filter = require('bad-words');

//bring in rate-limit
const rateLimit = require('express-rate-limit');

//create an app of it to invoke it
const app = express();

//connect to database using monk, 
//connect to mongodb on the computer to a database called meower
//when deploy, talk to the specified database if MONGO_URI is define, else connect to local DB
const db = monk(process.env.MONGO_URI ||  'localhost/meower');


//create a collection (collections are like arrays), collection is mews
const mews = db.get('mews');
//create new object of filter
const filter = new Filter();


//add body parser pipeline for server to process incoming data in json
app.use(express.json());

//make cors pipeline, incoming request pass thru for cors to add headers
app.use(cors());

//use rate-limit to limit no of request per period to avoid data spining from user
app.use(rateLimit({
    windowMs: 30 * 1000, //limit request every 30sec
    max: 1

}));



//when user request on the root / route, we give json
app.get('/', (req, res) => {
    res.json({
        message: 'Root route'});
});

//when the server receives a request on /mews
app.get('/mews', (req, res) => {
    //get our collection mews and query it using find, it returns all if no args is parse
    mews.
    find().
    //get result
    then(mews => {
        //respond with mews json
        res.json(mews);
    });
});

//isValidMew function
function isValidMew(mew){
    //take the name, make it string, trim to remove white space $ make sure not empty
    return mew.name && mew.name.toString().trim() !== '' &&
           //take the content, make it string, trim to remove white space $ make sure not empty
           mew.content && mew.content.toString().trim() !== '';

}

//when user post, we recieve into mews
app.post('/mews', (req, res) => {
    //if valid, insert into db collection
    if(isValidMew(req.body)){
        //make an obj of data $ send to collection
        const mew = {
            //clean with bad-words bf inserting into data-base

            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        }
        //after validation, insert mew into mews collections that resides in db
        mews.
        insert(mew).
        //get back created mew
        then( createdMew => {
            res.json(createdMew)
        });

    } else {
        //if invalid return 422 status and message
        res.status (422);
        res.json({
            message: 'Name and Content are required!'
        });

    }
});

//start backend server $ tell it to listen on
//port 5000
app.listen(5000, () => {
    console.log('listening on http://localhost:5000');
});