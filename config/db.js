import mongoose from "mongoose";

const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: process.env.DB_NAME,
    }).then((c)=> console.log(`Database Connected with ${c.connection.host}`))
    .then((e)=> console.log(e));
}

export default connectDB;

// This file is responsible for connecting to the MongoDB database. 
// It uses the mongoose.connect() method to connect to the database using the MONGO_URI environment variable. 
// If the connection is successful, it logs a message to the console. 
// If there is an error, it logs the error message and exits the process with an exit code of 1.
// Path: config/db.js
// Compare this snippet from index.js:
// import express from 'express';