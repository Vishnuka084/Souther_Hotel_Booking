import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { HotelType } from "../shared/types";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// // api/my-hotels - POST route to add a new hotel
// router.post(
//     "/", 
//     verifyToken,[
//         body("name").notEmpty().withMessage("Name is required"),
//         body("city").notEmpty().withMessage("City is required"),
//         body("country").notEmpty().withMessage("Country is required"),
//         body("description").notEmpty().withMessage("Description is required"),
//         body("type").notEmpty().withMessage("Hotel is required"),
//         body("pricePerNight").notEmpty().withMessage("price Per Night is required"),
//         body("facilities").notEmpty().withMessage("Facilities is required"),
//         //body("name").notEmpty().withMessage("Name is required"),

//     ],
//     upload.array("imageFiles",6),
//     async(req: Request, res: Response )=>{
//     try {
//         const imageFiles = req.files as Express.Multer.File[];
//         const newHotel: HotelType = req.body;

//         // 1. upload the image to cloudinary ;base64,
//         const uploadPromise =imageFiles.map(async(image)=>{
//             const b64 = Buffer.from(image.buffer).toString("base64");
//             let dataURI ="data:" + image.mimetype + ";base64" + b64;
//             const res = await cloudinary.v2.uploader.upload(dataURI);
//             return res.url;
//         });

//         const imageUrls = await Promise.all(uploadPromise);
//         newHotel.imageUrls = imageUrls;
//         newHotel.lastUpdated = new Date();
//         newHotel.userId = req.userId;

//         // 3. save the new hotel in our database
//         const hotel = new Hotel(newHotel);
//         await hotel.save();

//         // 4. return a 201 status 
//         res.status(201).send(hotel);

//     } catch (error) {
//         console.log("Error creating hotel: ", error);
//         res.status(500).json( {message: "Something went wrong "});
        
//     }
// });
router.post(
    "/",
    verifyToken, [
      body("name").notEmpty().withMessage("Name is required"),
      body("city").notEmpty().withMessage("City is required"),
      body("country").notEmpty().withMessage("Country is required"),
      body("description").notEmpty().withMessage("Description is required"),
      body("type").notEmpty().withMessage("Hotel is required"),
      body("pricePerNight").notEmpty().withMessage("price Per Night is required"),
      body("facilities").notEmpty().withMessage("Facilities is required"),
    ],
    upload.array("imageFiles", 6),
    async (req: Request, res: Response) => {
      try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;
  
        // Upload the image to Cloudinary
        const uploadPromise = imageFiles.map(async (image) => {
          try {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const cloudRes = await cloudinary.v2.uploader.upload(dataURI);
            console.log("Uploaded image URL:", cloudRes.url); // Check if URL is received
            return cloudRes.url;
          } catch (err) {
            console.error("Cloudinary upload error: ", err);
            throw new Error("Failed to upload image");
          }
        });
  
        const imageUrls = await Promise.all(uploadPromise);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
  
        // Save the new hotel in the database
        const hotel = new Hotel(newHotel);
        await hotel.save();
        
        res.status(201).send(hotel);
      } catch (error) {
        console.log("Error creating hotel: ", error);
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  );
  
router.get("/", verifyToken,async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({ userId: req.userId});
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotels"});
    }
});


router.get("/:id", verifyToken, async (req: Request, res:Response) => {
    const id = req.params.id.toString();
    try {
        const hotel = await Hotel.find({
            _id: id,
            userId: req.userId,
        });
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotels "});
    }
});

export default router;