const express=require('express')
const router=express.Router()
const recipeController=require('../controller/recipeController')
const recipe = require('../model/recipe')
//home page
router.get('/',recipeController.home)
// post recipes
 router.post('/',recipeController.createRecipe)
 //get all recipes
 router.get('/all',recipeController.allRecipes)
//get recipes by using id
router.get('/:id',recipeController.getRecipeById)
//update recipes by using id
router.put('/:id',recipeController.updateRecipe)
//delete recipes using by id
router.delete('/:id',recipeController.delete)



module.exports=router;