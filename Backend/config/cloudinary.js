import cloudinary from "cloudinary";

export const cloudinaryConnect = () => {
  try {
    console.log("Cloudinary Config - Environment Variables:");
    console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
    console.log("API_KEY:", process.env.API_KEY ? "***SET***" : "NOT SET");
    console.log(
      "API_SECRET:",
      process.env.API_SECRET ? "***SET***" : "NOT SET"
    );

    // Check if required variables are set
    if (
      !process.env.CLOUD_NAME ||
      !process.env.API_KEY ||
      !process.env.API_SECRET
    ) {
      throw new Error("Missing required Cloudinary environment variables");
    }

    cloudinary.config({
      //!    ########   Configuring the Cloudinary to Upload MEDIA ########
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    console.log("Cloudinary configuration completed successfully");

    // Test the configuration
    cloudinary.api
      .ping()
      .then(() => {
        console.log("✅ Cloudinary connection test successful");
      })
      .catch((error) => {
        console.error("❌ Cloudinary connection test failed:", error);
      });
  } catch (error) {
    console.log("Error configuring Cloudinary:", error);
    console.log("Please check your .env file and restart the server");
  }
};
