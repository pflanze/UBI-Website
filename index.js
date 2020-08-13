const express = require('express');
const Datastore = require('nedb'),
database = new Datastore({
    filename: 'database.db',
    autoload: true
    });;

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb'}));


database.getAutoincrementId = function (cb) { 
    console.log("auto 1")
    this.update(
        { _id: '__autoid__' },
        { $inc: { seq: 1 } },
        { upsert: true, returnUpdatedDocs: true },
        function (err, affected, autoid) { 
            console.log("auto 2")
            cb && cb(err, autoid.seq);
        }
        
    );
    console.log("auto 3")
    return this;
};

function test(answer){
    let data = {
        answer: answer,
        country: "CH",
        date: 1597344941
    }
    return database.getAutoincrementId(
        function (err, id) {
            data._id = id;
            database.insert(data);
        });
}

app.get('/api',  (request, response) => {
    database.find({}).sort({ date: 1 }).exec(function (err, data) { 
            if (err) {
                response.end();
                return;
            }
            
            response.json(data);
            
         
            
    });


});

app.post('/api', (request, response) => {
 
    console.log('I got a request!');
    console.log(request.body);
    const data = request.body;
    database.getAutoincrementId(
        function (err, id) {
            data._id = id;
            database.insert(data);
        });
    response.json(data);

});


exports.app = app
exports.database = database
exports.test = test
