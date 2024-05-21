const CrtlPost = require("../modules/PostModel");
const fs = require('fs')

// create post


const CreatePost = async (req, res) =>{
    try {
        
        const extension = req.file.mimetype.split("/")[1];
        if (extension == "png" || extension == "jpg" || extension == "jpeg") {
            const fileName = req.file.filename + "." + extension;
            req.body.image = fileName
            console.log(fileName)

            fs.rename(req.file.path, `uploads/${fileName}`, () => {
                console.log("\nFile Renamed!\n");
            })
        }
        else {

            fs.unlink(req.file.path, () => console.log("file deleted"))
            return res.json({
                message: "only images are accepted"
            })
        }
        await CrtlPost.create(
            req.body
        )

        return res.status(200).json({
            status: true,
            message: "post created successfully"
        })
    } catch (error) {
        console.log(error.message)
    }
}


// get all post

const GetAllPost = async (req, res) => {

    

    try {

       

        const data = await CrtlPost.find().sort({ createdAt: -1 })


        return res.status(200).json({
            status: true,
            data: data
        })
    } catch (error) {
       // Handling errors
       console.log(error.message);
       // Sending error response with status 500 (Internal Server Error)
       return res.status(500).json({
           status: false,
           message: 'Internal Server Error'
        });
    }
}



// update post

const UpdataPost = async (req, res) => {
    const params = req.params._id; 

    try {
        const updatepost = await CrtlPost.findByIdAndUpdate( params, req.body, { new: true } );

        if (!updatepost) {
            
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // Return success message and updated data
        return res.json({
            message: "Successfully updated",
            data: updatepost
        });
    } catch (error) {
        // Handle any errors that occur during the update process
        console.log(error.message);
        // Return an error response with status 500 (Internal Server Error)
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};


//delete  post


const DeletePost = async (req, res) => {
    const params = req.params._id



    try {
        const postdelete = await CrtlPost.findByIdAndDelete(params);


        return res.json({
            message: "successfully deleted",
            data: postdelete
        })
    } catch (error) {

    }
}



module.exports ={
    CreatePost, GetAllPost, UpdataPost, DeletePost
}