const S3 = require("../middleware/S3");

const imageUpload = async(req,res,next)=>{
    try{
        let links = [];
        for(let i =0;i<req.files.length;i++){
            const response = await S3.uploadFile(process.env.AWS_BUCKET_NAME,req.files[i]) ;
            links.push(response.Location)
        }
        return res.status(200).json({links})
    }catch(error){
        if(error.statusCode ===403){
            return res.status(403).json({"message":"Acsess Denied By AWS"})
        }
        return res.status(500).json({"message":"Something Went Wrong"});
    }
} 

const fetchUserImages = async (req,res,next)=>{
    try{
        const userId = req.params.userId;
        console.log("hello")
        const response = await S3.fetchUserImages(process.env.AWS_BUCKET_NAME,userId);
        console.log(response)
        return res.status(200).json({imageData:response});
    }catch(error){
        if(error.statusCode ===403){
            return res.status(403).json({"message":"Acsess Denied By AWS"})
        }
        return res.status(500).json({"message":"Something Went Wrong"});
    }
}

module.exports.imageUpload = imageUpload;
module.exports.fetchUserImages = fetchUserImages;
