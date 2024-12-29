const PhotoService = require("../services/PhotoService");

const uploadPhotos = async (req, res) => {
  try {
    const payload = {
      projectId: req.params.id ?? null,
      photos: req.files ?? [],
    };

    const response = await PhotoService.upload(payload);

    return res.status(200).json({
      status: true,
      message: "photos upload successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ status: false, message: error.message, data: null });
  }
};

const getAllPhotos = async (req, res) => {
  try {
    const payload = {
      projectId: req.params.id,
    };

    const response = await PhotoService.getAll(payload);

    return res.status(200).json({
      status: true,
      message: "all photos fetch successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ status: false, message: error.message, data: null });
  }
};

module.exports = {
  uploadPhotos,
  getAllPhotos,
};
