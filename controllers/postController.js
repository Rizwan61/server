
const fs = require('fs')
const CreatePost = require("../modules/PostModel");


// Create New Post
const newcreatepost =  async (req, res) => {
    const { title, price , category, content } = req.body;
    // console.log(req.body)


    try {
        const extension = req.file.mimetype.split("/")[1];
        if (extension == "png" || extension == "jpg" || extension == "jpeg" || extension == "avif") {
            const fileName = req.file.filename + "." + extension;
            req.body.image = fileName;
           

            fs.rename(req.file.path, `upload/${fileName}`, () => {
                console.log("file Uploaded with name")
            });

        } else {
            fs.unlink(req.file.path, () => {
                console.log("file is deleted")
            })
        }



        
       

        // create user
        await CreatePost.create({
            title: title, price: price, category: category, content:content, image: req.body.image })


        // return response
        res.status(201).json({
            status: "success",
            message: "New Psot successfully Added"


        })

    } catch (error) {
        if (error.name === 'ValidationError') {
            // Mongoose validation error
            const errors = {};
            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            res.status(200).json({
                status: false,
                errors: errors
            });
        } else {
            // Other types of errors
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
// getall category



// Get All Post API

const GetsAllPosts =  async (req, res) => {
    
    try {
        const allpost = await CreatePost.find();
        return res.status(200).json({
            status: true,
            allpost: allpost
        })
    } catch (error) {
        return res.status(404).json({
            status: false,
            message: error.message,
            allpost:allpost
        })
    }
}

// Update Post 

const updatePost = async (req,res)=>{
    const { title, price, category, content, image } = req.body;
    

    console.log(req.body)
    return
    const params = req.params.id;
    
    

    try {
        const updatepost = await CreatePost.findByIdAndUpdate(params,{title,price,category,content, image},{new:true});
        return res.status(200).json({
            status: true,
            message: "Post Updated Successfully",
            updatepost:updatepost
            })

        }
        catch (error) {
            
            return res.status(404).json({
                status: false,
                message: error.message,
                
                })
        }
    
}

module.exports = {
    newcreatepost,
    GetsAllPosts,
    updatePost
    
    
}