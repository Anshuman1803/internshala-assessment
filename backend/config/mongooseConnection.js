const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const dotENV = require("dotenv");
dotENV.config();

const MONGO__URL = process.env.databaseURL


const mongooseConnection = async()=>{
    try{
        await mongoose.connect(MONGO__URL);
        console.log("SUCCESSFULLY CONNECTED WITH DATABASE");
    }catch(err){
        console.log(`SOMETHING WENT WRONG IN DATABASE CONNECTION : ${err}`);
    }
}


module.exports = {mongooseConnection}