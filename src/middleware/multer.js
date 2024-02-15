const multer=require("multer");
const path = require("path");
const fs = require('fs');


//multer Storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, require('path').resolve(__dirname, '..') + "/upload");
    },
    filename: function (req, file, cb) {
        console.log(`${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`)
        cb(null, `${req.params.userId}-${Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000}-${path.extname(file.originalname)}`)
    },
});

//multer upload middleware for qr genration in batches
const upload = multer({ storage: storage });

const multipleUpload = upload.array('images', 11);


module.exports.multipleUpload = multipleUpload;
