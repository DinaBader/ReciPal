const express=require("express");
const {connectToMongoDB} =require("./configs/mongoDb.configs");
const app=express();
app.use(express.json());
require("dotenv").config();

// const { authMiddleware } = require("./middlewares/auth.middleware");


const UserRoutes=require("../backend/routes/auth.routes");
app.use("/auth",UserRoutes);

const ReviewRoutes=require("../backend/routes/review.routes");
app.use("/review",ReviewRoutes);

app.listen(8000,()=>{
    console.log("Server listening on PORT: ",8000);
    connectToMongoDB();
})