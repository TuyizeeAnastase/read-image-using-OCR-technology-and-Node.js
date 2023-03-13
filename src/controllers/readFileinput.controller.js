import Tesseract from "tesseract.js";

export class ReadFileInputControllers {
  async readFileinput(req, res) {
    try {
      const file = req.results.secure_url;
      Tesseract.recognize(file, "eng").then(({ data: { text } }) => {
        console.log(text);
      });
      // return res.status(201).json({
      //   file,
      // });
    } catch (err) {
      return res.status(500).json({
        message: "Error while reading file",
        error: err.message,
      });
    }
  }
}

const readFileController = new ReadFileInputControllers();
export default readFileController;
