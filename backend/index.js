const express=require("express");
const {connectToMongoDB} =require("./configs/mongoDb.configs");
const {authMiddleware}=require("./middlewares/auth.middleware");
const app=express();
app.use(express.json());
require("dotenv").config();
const fileUpload = require("express-fileupload");
app.use(fileUpload());

const UserRoutes=require("../backend/routes/auth.routes");
app.use("/auth",UserRoutes);

const ReviewRoutes=require("../backend/routes/review.routes");
app.use("/review",ReviewRoutes);

const RecipeRoutes=require("../backend/routes/recipe.routes");
app.use("/recipe",authMiddleware,RecipeRoutes);

const RewardRoutes=require("../backend/routes/user.routes");
app.use("/reward",authMiddleware,RewardRoutes);

app.listen(8000,()=>{
    console.log("Server listening on PORT: ",8000);
    connectToMongoDB();
})