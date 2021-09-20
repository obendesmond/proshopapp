import express from "express";
import multer from "multer";
import path from "path";
import findRemoveSync from "find-remove";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path
        .extname(file.originalname)
        .toLowerCase()}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  // replace all '\' with '/' - \\ outputs \
  const imagePath = `/${req.file.path}`.split("\\").join("/");
  // console.log(`Image Path: ${imagePath}`);
  res.send(imagePath);
});

// this is meant to remove the previous images BUT DOES'NT WORK FOR NOW
router.post("/deletePrevImage", async (req, res) => {
  const { prevImage } = req.body;
  try {
    // remove previous image
    await findRemoveSync("../../uploads", { files: `${prevImage}` });
    console.log("previmage removed");
    res.send(true);
  } catch (error) {
    console.log(error);
  }
});

export default router;
