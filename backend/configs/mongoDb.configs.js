const {default:mongoose} =require("mongoose");
const mogoose = require("mongoose");

const connectToMongoDB = () =>{
    mogoose.connect("mongodb://127.0.0.1:27017/db_recipal");
    const connection = mongoose.connection;
    connection.on("error",(error)=>{
        console.log("Error connecting to MongoDB: ",error);
    });

    connection.once("open",()=>{
        console.log("Connected to MongoDB...");
    })
}

module.exports = {connectToMongoDB};