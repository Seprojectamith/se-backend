const AWS = require('aws-sdk');
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const { url } = require('inspector');

//configuring the s3 object
//to get the access of the respective bucket
const s3= new S3({})

//upload a file to S3
function uploadFile(bucketName,file,folderPath=""){
    const fileKey = folderPath?`${folderPath}/${file.filename}`:file.filename;
    try{
        const fileStream = fs.createReadStream(file.path);
        const uploadParams = {
            Bucket:bucketName,
            Body:fileStream,
            Key:fileKey
        }
        // console.log(uploadParams)
        return s3.upload(uploadParams).promise();
    }
    catch(e){
        console.log(e.message)
        return e;
    }
}

async function fetchUserImages(bucketName,userId){
    try{
        const params = {
            Bucket: bucketName, 
            Prefix: userId + '-' 
        };
        const data = await s3.listObjectsV2(params).promise();
        const baseUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/`;
        const urls = data.Contents.map((content) => {
            return {
                "imageUrl":baseUrl + encodeURIComponent(content.Key),
                "uploadedDate":content.LastModified
            }
        });
        return urls;
    }catch(error){
        console.log(error)
        return error;
    }
}

module.exports.uploadFile = uploadFile;
module.exports.fetchUserImages = fetchUserImages;