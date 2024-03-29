import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder;
    if (file.fieldname === "document") {
      folder = "documents";
    } else if (file.fieldname === "photo") {
      folder = "photos";
    } else {
      folder = "mics";
    }
    return {
      folder: folder,
      allowed_formats: ["jpg", "png"],

      transformation: [
        { aspect_ratio: "1.0", width: 300, crop: "fill" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
    };
  },
});

const upload = multer({ storage });

export default upload;
