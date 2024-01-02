const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    role:{
        type:Number,
        default:2,
    },
    image:{
        type:String,
        default:"",
    },
    finshed_recipes:[{
        recipe:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"recipe",
        },
        completed:{type:Boolean,default:false},
    },],
    rewards:[{
        recipe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "recipe",
        },
        country: {
            type: String,
            required: true,
        },
    }],
    saved:[{
        recipe:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"recipe",
        },
    }]   

});

userSchema.pre(
    "save",
    async function (next){
        try{
            const salt= await bcrypt.genSalt(10);
            this.password=await bcrypt.hash(this.password,salt);
            next();
        }catch(error){
            console.log(error);
            next(error);
        }
    }
)

const User=mongoose.model("User",userSchema);
module.exports=User;