const express= require('express')
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


const PostCrtl=require('../controllers/postController')

// post routes

router.post("/createpost",upload.single('image'),PostCrtl.newcreatepost)
router.get("/getallpost", PostCrtl.GetsAllPosts )
router.put("/updatepost/:id", PostCrtl.updatePost )




module.exports = router;