import express, { Request, Response } from "express";
import multer from 'multer';
import cloudinary from "cloudinary";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024  //5mb
    }
})

// api/my-hotels
router.post("/", upload.array("imageFiles",6), async(req: Request, res: Response )=>{
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel = req.body;

        // 1. upload the image to cloudinary ;base64,
        const uploadPromise =imageFiles.map(async(image)=>{
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI ="data" + image.mimetype + ";base64" + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        });

        const imageUrls = await Promise.all(uploadPromise);

        // 2. if upload was successful, add the URLS to the new hotel
        // 3. save the new hotel in our database
        // 4. return a 201 status 

    } catch (error) {
        console.log("Error creating hotel: ", error);
        res.status(500).json( {message: "Something went wrong "});
        
    }
});