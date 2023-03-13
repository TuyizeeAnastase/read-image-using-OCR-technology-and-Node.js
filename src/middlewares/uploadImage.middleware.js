import cloadinary from "cloudinary";

export const checkUpload = async (req, res, next) => {
  if (req.files) {
    const file = req.files.image;
    cloadinary.uploader.upload(file.tempFilePath, async (results, err) => {
      if (err) {
        res.status(500).json({
          message: "Unable to upload image",
          error: err,
        });
      }
      req.results = results;
      next();
    });
  } else {
    res.status(400).json({
      message: "Please upload image",
    });
  }
};

export const checkUploadFormat = (...extensions) => {
  return (req, res, next) => {
    const results = req.results;
    if (!extensions.includes(results.format.toLowerCase())) {
      return res.status(405).json({
        message: `Only ${extensions} format is allowed`,
      });
    }
    req.results = results;
    next();
  };
};
