const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
require("dotenv").config();

const connectionParams={
    useNewUrlParser:true,
    useUnifiedTopology:true,
}
const url = process.env.mongo_uri;
mongoose.connect(url, connectionParams);
const connection = mongoose.connection;

connection.on("connected", ()=>{
    console.log("MongoDB connected successfully");
})

connection.on('error', (err)=>{
    console.log("MongoDB connection failed");
})