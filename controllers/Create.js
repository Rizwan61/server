const CrtlPost = require("../modules/PostModel");
const fs = require("fs");

// create post
const CreatePost = async (req, res) => {
  try {
    const extension = req.file.mimetype.split("/")[1];
    if (extension == "png" || extension == "jpg" || extension == "jpeg") {
      const fileName = req.file.filename + "." + extension;
      req.body.image = fileName;
      console.log(fileName);

      fs.rename(req.file.path, `uploads/${fileName}`, () => {
        console.log("\nFile Renamed!\n");
      });
    } else {
      fs.unlink(req.file.path, () => console.log("file deleted"));
      return res.json({
        message: "only images are accepted",
      });
    }
    await CrtlPost.create(req.body);

    return res.status(200).json({
      status: true,
      message: "post created successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

// get all post
const GetAllPost = async (req, res) => {
  try {
    const data = await CrtlPost.find().sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    // Handling errors
    console.log(error.message);
    // Sending error response with status 500 (Internal Server Error)
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

// get single post by id
const GetSinglePostByID = async (req, res) => {
  const params = req.params.id;
  try {
    console.log(params);
    const singlePost = await CrtlPost.findById(params);
    return res.json({
      message: "successfully Found",
      data: singlePost,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// update post
const UpdataPost = async (req, res) => {
  console.log(req.body);
  const params = req.params.id;
  console.log(req.params.id);

  try {
    const extension = req.file.mimetype.split("/")[1];
    if (extension === "png" || extension === "jpg" || extension === "jpeg") {
      const fileName = req.file.filename + "." + extension;
      req.body.image = fileName;
      console.log(fileName);

      fs.rename(req.file.path, `uploads/${fileName}`, (err) => {
        if (err) {
          throw new Error("File renaming failed");
        }
        console.log("\nFile Renamed!\n");
      });
    } else {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          throw new Error("File deletion failed");
        }
        console.log("file deleted");
      });
      return res.status(400).json({
        message: "only images are accepted",
      });
    }

    const updatepost = await CrtlPost.findByIdAndUpdate(params, req.body, {
      new: true,
    });

    return res.status(200).json({
      status: true,
      message: "post updated successfully",
      data: updatepost,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: false,
      message: "An error occurred while updating the post",
      error: error.message,
    });
  }
};

//delete  post
const DeletePost = async (req, res) => {
  const params = req.params.id;
  try {
    const postdelete = await CrtlPost.findByIdAndDelete(params);
    return res.json({
      message: "successfully deleted",
      data: postdelete,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  CreatePost,
  GetAllPost,
  UpdataPost,
  DeletePost,
  GetSinglePostByID,
};
