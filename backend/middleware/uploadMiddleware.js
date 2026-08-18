import multer from "multer";
import AppError from "../utils/appError.js";
import sharp from "sharp";

// Set up multer storage and file filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

// Store in RAM as Buffer
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: multerFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Middleware to handle user photo upload
export const uploadUserPhoto = upload.single("photo");

// Middleware to resize user photo
export const resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();

  // Generate a unique filename for the uploaded photo
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  // Resize and convert the image to JPEG format
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
};
