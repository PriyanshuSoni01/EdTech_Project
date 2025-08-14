import cloudinary from "cloudinary";
import fs from "fs";

export const uploadImageToCloudinary = async (
  file,
  folder,
  height,
  quality
) => {
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  console.log("OPTIONS", options);

  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    console.log("Upload successful:", result);
    return result;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

// New function specifically for video uploads
export const uploadVideoToCloudinary = async (file, folder) => {
  console.log("=== VIDEO UPLOAD DEBUG ===");
  console.log("File object:", {
    name: file.name,
    mimetype: file.mimetype,
    size: file.size,
    tempFilePath: file.tempFilePath
  });
  console.log("Folder:", folder);
  
  // Check if temp file exists and is readable
  try {
    if (!fs.existsSync(file.tempFilePath)) {
      throw new Error(`Temp file does not exist: ${file.tempFilePath}`);
    }
    
    const stats = fs.statSync(file.tempFilePath);
    console.log("File stats:", {
      size: stats.size,
      isFile: stats.isFile(),
      permissions: stats.mode
    });
    
    if (stats.size === 0) {
      throw new Error("Temp file is empty (0 bytes)");
    }
    
  } catch (fsError) {
    console.error("File system error:", fsError);
    throw new Error(`File validation failed: ${fsError.message}`);
  }
  
  // Try different approaches for Cloudinary v2
  const options = {
    folder,
    resource_type: "video",
    chunk_size: 6000000, // 6MB chunks for better upload
    // Add these options to force video handling
    format: "mp4",
    eager: [
      { width: 300, height: 300, crop: "pad", audio_codec: "none" },
      { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" }
    ]
  };
  console.log("VIDEO UPLOAD OPTIONS", options);
  
  try {
    console.log("Starting Cloudinary upload...");
    
    // First, try with explicit video options
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    console.log("Video upload successful:", result);
    return result;
    
  } catch (error) {
    console.error("Video upload failed:", error);
    console.error("Error details:", {
      message: error.message,
      name: error.name,
      http_code: error.http_code,
      stack: error.stack
    });
    
    // If the first attempt fails, try with minimal options
    try {
      console.log("Retrying with minimal options...");
      const fallbackOptions = {
        folder,
        resource_type: "auto" // Let Cloudinary auto-detect
      };
      
      const fallbackResult = await cloudinary.uploader.upload(file.tempFilePath, fallbackOptions);
      console.log("Fallback upload successful:", fallbackResult);
      return fallbackResult;
      
    } catch (fallbackError) {
      console.error("Fallback upload also failed:", fallbackError);
      throw fallbackError;
    }
  }
};
