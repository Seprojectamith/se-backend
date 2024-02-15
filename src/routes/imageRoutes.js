const express=require("express");
const router=express.Router();

const imageController = require("../controllers/imageController");
const multerhandler = require("../middleware/multer")

router.post("/upload/:userId",multerhandler.multipleUpload,imageController.imageUpload)

router.get("/user/:userId",imageController.fetchUserImages)

module.exports = router;