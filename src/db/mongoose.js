const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://seproject65:1234567890@cluster0.kn2b4wz.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db=mongoose.connection;

db.on("error",(error)=> console.log(error));
db.once("open",()=>console.log("connected to database"));
