
// import module `mongoose`
const mongoose = require('mongoose');

require('dotenv').config();

let url;

if (process.env.ENV === 'development') {
    url = `mongodb://${process.env.DBADDRESS}:${process.env.DBPORT}/${process.env.COLLECTION}`;
} else if (process.env.ENV === 'production') {
    url = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.COLLECTION}.zykly.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
}

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

// defines an object which contains necessary database functions
const database = {
    connect: function () {
        console.log('Connecting to: ' + url);
        mongoose.connect(url, options, function (err) {
            if (err) console.log(err);
            console.log('Connected to: ' + url);
        });
    },

    insertOne: function (model, doc, callback) {
        model.create(doc, function (err, res) {
            if (err) console.log(err);
            console.log("Added 1 document to " + model.collection.collectionName);
            callback(res);
        });
    },

    insertMany: function (model, docs) {
        model.insertMany(docs, function (err, res) {
            if (err) console.log(err);
            console.log("Added " + res.length + " documents to " + model.collection.collectionName);
        });
    },

    findOne: function (model, query, projection, callback) {
        model.findOne(query, projection, function (err, res) {
            if (err) console.log(err);
            return callback(res);
        });
    },

    findMany: function (model, query, projection, callback) {
        model.find(query, projection, function (err, res) {
            if (err) console.log(err);
            return callback(res);
        });
    },

    findLimitSort: function (model, query, projection, limit, sort, callback) {
        model.find(query).limit(limit).sort(sort).exec(function (err, res) {
            if (err) console.log(err);
            return callback(res);
        })
    },

    updateOne: function (model, filter, update) {
        model.updateOne(filter, update, function (err, res) {
            if (err) console.log(err);
            console.log("Document modified: " + res.nModified);
        })
    },

    updateMany: function (model, filter, update) {
        model.updateMany(filter, update, function (err, res) {
            if (err) console.log(err);
            console.log("Document modified: " + res.nModified);
        })
    },

    deleteOne: function (model, conditions) {
        model.deleteOne(conditions, function (err, res) {
            if (err) console.log(err);
            console.log("Document deleted: " + res.deletedCount);
        })
    },

    deleteMany: function (model, conditions) {
        model.deleteMany(conditions, function (err, res) {
            if (err) console.log(err);
            console.log("Document deleted: " + res.deletedCount);
        })
    },

    count: function (model, query, callback) {
        model.countDocuments(query, function (err, count) {
            if (err) console.log(err);
            return callback(count);
        });
    }
}

module.exports = database;
