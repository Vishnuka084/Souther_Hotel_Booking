// import express, { Request, Response } from 'express';
// import cors from 'cors';
// import "dotenv/config";

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(cors());

// app.get("/api/test", async (req: Request, res: Response ) => {
//     res.json({ message: "Hello from express endpoint "});
// });

// app.listen(5000, () => {
//     console.log("server running on localhost: 5000");
// });


import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
    res.json({ message: "Hello from express endpoint" });
});

const PORT = process.env.PORT || 5001;  // Changed from 5000 to 5001
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
