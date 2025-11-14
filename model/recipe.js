const mongoose=require('mongoose')
const recipeSchema=new mongoose.Schema({
    name:{type:String,required:[true,'Recipe name is Required']},
    ingredients:{type:[String],required:[true,'ingredients are Required']},
    instructions:{type:[String],required:[true,'instructions are Required']},
    createAt:{type:Date,default:Date.now}


},
{versionKey:false}
);
module.exports=mongoose.model("Recipe",recipeSchema)