const dotenv = require("dotenv");
dotenv.config({ path: __dirname+'.env' });
require("./db/mongoose")


const express=require("express");
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors=require("cors");
const allowedDomains=["http://localhost:3000","http://localhost:3002","http://localhost:3003","http://se-project-frontend.s3-website-us-west-2.amazonaws.com"]
// app.use(cors());
app.use(cors({  
    credentials:true,
    origin:function (origin, callback) {
        // bypass the requests with no origin
        if (!origin) return callback(null, true);
        if (allowedDomains.indexOf(origin) === -1) {
            let msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    exposedHeaders:['Content-Disposition']
}));


const imageRoutes = require("./routes/imageRoutes")
const userRoutes = require("./routes/userRoutes")

app.use("/image",imageRoutes)
app.use("/user",userRoutes)




app.all("/*",(req,res)=>{
    res.send("page not found");
});

//port listening at in the server
app.listen(3002, ()=>{
    console.log("running on port " + 3002);
});
