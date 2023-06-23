const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
require("dotenv").config();

const connectionParams={
    useNewUrlParser:true,
    useUnifiedTopology:true,
}
mongoose.connect(process.env.mongo_uri, connectionParams);
const connection = mongoose.connection;

connection.on("connected", ()=>{
    console.log("MongoDB connected successfully");
})

connection.on('error', (err)=>{
    console.log("MongoDB connection failed");
})