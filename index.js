const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();
/*const numCountdb = new Datastore('numCount.db');
numCountdb.loadDatabase();*/

app.get('/api',  (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data)
    });
/*
    numCountdb.find({},(err, numCount) => {
        if (err) {
            response.end();
            return;
        }
        response.json(numCount)
    })*/
});

app.post('/api', (request, response) => {
    console.log('I got a request!');
    console.log(request.body);
    const data = request.body;
    database.insert(data);
    response.json(data);
    /*numCountdb.insert(data);
    response.json(data);*/
});