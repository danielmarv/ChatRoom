// controllers/cloudinaryController.js
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Controller function to handle image upload
const uploadImage = async (req, res, next) => {
    try {
      // Use Cloudinary SDK to upload the image
      // The buffer data we are using from request object was attached by multer
      await cloudinary.v2.uploader.upload_stream(
        { resource_type: 'image' }, // Specify resource type if necessary
        async (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error, message: "Image upload failed" });
          }
  
          // Save the public_id or URL in your database
          const picturePath = result.secure_url;
  
          // Attach the picturePath to the request
          // This will be saved in the User object when saving to the database
          req.picturePath = picturePath;
  
          // Continue to the next middleware or route handler
          next();
        }
      ).end(req.file.buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error, message: 'Image upload failed' });
    }
};

export const cloudinaryController = {
    uploadImage,
}
