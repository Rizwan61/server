const express= require('express')
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


const PostCrtl=require('../controllers/Create')

// post routes

router.post("/createpost",upload.single('image'),PostCrtl.CreatePost)
router.get("/getpost",PostCrtl.GetAllPost)
router.get("/getpostbyID/:id",PostCrtl.GetSinglePostByID)
router.put("/updatepost/:id",upload.single('image'),PostCrtl.UpdataPost)
router.delete("/deletepost/:id",PostCrtl.DeletePost)



module.exports = router;