const Recipe=require('../model/recipe')
const mongodb=require('mongodb')
const objectId=mongodb.ObjectId;
//create new recipes 
exports.createRecipe=async(req,res)=>{
    try{
        const new_recipe=await Recipe.create(req.body)
        res.status(201).json({message:'create recipe successfuly',recipe:new_recipe});

    }
    catch(error){
        res.status(400).json({message:error.message})
        
    }

};
//recipe home page
exports.home=async(req,res)=>{
    try{
        
        res.status(201).json({message:'welcome to Recipes app'});

    }
    catch(err){
        res.status(400).json({message:err.message})

    }
}
//get all recipes
exports.allRecipes=async(req,res)=>{
    try{
    const recipes = await Recipe.find()
    res.status(201).json(recipes)


    }
    catch(error){

        res.status(400).json({message:error})
    }
        
}
//get recipes using by id
    exports.getRecipeById=async(req,res)=>{
        try{
            const recipes=await Recipe.findById(req.params.id)
            res.status(201).json({message:'getRecipeByid successfully',recipe:recipes})

        }
        catch(error){
                  console.error("Mongodb error:", error.message);
        res.status(500).json({ message: "error fetching recipes:", error: error.message })

        }

    }

    //edit and update recipes 
    exports.updateRecipe=async(req,res)=>{
        try{
                    const update_recipes=await Recipe.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators: true})
                    if(!update_recipes){
                        return res.status(400).json({message:"Recipe not found"})
                    }
        res.status(200).json({message:'updated Succesfully',updateRecipes:update_recipes})

        }
        catch(error){
            console.error('mongodb Error:',error.message)
res.status(500).json({message: "error fetching recipes:", error: error.message})
        }
    }
    //delete recipes
    exports.delete=async(req,res)=>{
        try{
            const delete_recipe=await Recipe.findByIdAndDelete(req.params.id)
            if(!delete_recipe){
                res.status(400).json({message:'recipe not found '})
            }
            else{
                res.status(200).json({message:'recipe deleted successfully'})
            }


        }
        catch(error){
                    console.error('mongodb Error:',error.message)
                    res.json(500).json({message:"error fetching recipes:",error:error.message})

        }
    }
