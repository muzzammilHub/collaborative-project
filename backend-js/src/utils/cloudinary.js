import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_CLOUD_APIKEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY 
  })


  const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })

        console.log("File uploaded successfully: ", response.url)
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        // remove the file from system as due to some issue that file is unable to upload on cloudinary

        return null;
    }
}

export {uploadOnCloudinary}