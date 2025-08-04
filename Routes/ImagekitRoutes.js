// // Routes/ImagekitRoutes.js
// import express from "express";
// import ImageKit from "imagekit";
// import dotenv from "dotenv";

// dotenv.config();

// const router = express.Router();

// const imagekit = new ImageKit({
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
// });

// router.get("/imagekit/auth", (req, res) => {
//   const authParams = imagekit.getAuthenticationParameters();
//   res.json(authParams);
// });

// export default router;
