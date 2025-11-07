const express = require('express');
const app = express();
//const cors=require('cors');
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient;
const URL = process.env.DB
const DB_NAME = "recipe_app"
const ObjectId = mongodb.ObjectId
const dotEnv=require('dotenv').config()


app.use(express.json());


app.get("/", (req, res) => {
    res.json({ message: "Wellcome To Recipes APP" })
    //res.json(req.body)
}
)


//post recipe
app.post("/", async (req, res) => {
    try {
        //1.connect database
        const connection = await mongoClient.connect(URL)
        //2.select database
        const db = connection.db(DB_NAME)
        //3.select collection
        const collection = db.collection("recipes")

        //4.do the operation
        await collection.insertOne(req.body)
        //5.close connecton
        await connection.close()
        res.status(201).json({ message: "Recipe created Successfully" })

    }
    catch (error) {
        console.error("mongodb error:", error.message)
        res.status(500).json({ message: "Error inserting recipe", error: error.message })
    }
})
//get all recipes
app.get("/recipes", async (req, res) => {
    try {
        //connect db
        const connection = await mongoClient.connect(URL)
        //select db
        const db = connection.db(DB_NAME);
        //select collection
        const collection = db.collection("recipes")
        //do the operation
        const recipe = await collection.find().toArray()
        //connection close
        await connection.close()
        res.status(200).json(recipe)
        // res.json({message:"get all Recipes"})

    }
    catch (error) {
        console.error("Mongodb error:", error.message);
        res.status(500).json({ message: "error fetching recipes:", error: error.message })
    }
})


//get recipes specific one recipe
app.get("/recipes/:id", async (req, res) => {
    try {
        //connect db
        const connection = await mongoClient.connect(URL)
        //select db
        const db = connection.db(DB_NAME);
        //select collection
        const collection = db.collection("recipes")
        //do the operation
        const recipe = await collection.findOne({ _id: new ObjectId(req.params.id) })
        //connection close
        await connection.close()
        res.status(200).json(recipe)

    }
    catch (error) {
        console.error("Mongodb error:", error.message);
        res.status(500).json({ message: "error fetching recipes:", error: error.message })
    }
})

//delete recipes
app.delete("/recipes/:id", async (req, res) => {
    try {

        //1.connect db
        const connection = await mongoClient.connect(URL)

        //2.select db
        const db = connection.db(DB_NAME);

        //3.select collection
        const collection=db.collection("recipes")
        //4.do the operation
        const recipe=await collection.deleteOne({_id : new ObjectId(req.params.id)})
        //res.status(200).json(recipe)
        res.json({message:"Recipe Deleted successfully"})
        //5.close connection
        await connection.close()

    }
    catch (error) {
        console.error("  mongodb  error:", error.message);
        res.status(500).json({message:"fetching recipes error:",error:error.message})

    }
})
//update recipe using by id
app.put("/recipes/:id", async (req, res) => {
    try {

        //1.connect db
        const connection = await mongoClient.connect(URL)

        //2.select db
        const db = connection.db(DB_NAME);

        //3.select collection
        const collection=db.collection("recipes")
        //4.do the operation
        const update_recipe=await collection.findOneAndUpdate({_id : new ObjectId(req.params.id)},{$set:req.body},{returnDocument:"after"})
        res.status(200).json({message:"Recipe Updated successfully",UpdateRecipe:update_recipe.value})
       // res.json({message:"Recipe Updated successfully"})
        //5.close connection
        await connection.close()

    }
    catch (error) {
        console.error("  mongodb  error:", error.message);
        res.status(500).json({message:"fetching recipes error:",error:error.message})

    }
})


//console.log("hello")
app.listen(5500, () => {
    console.log("server is running on port 5500")
})  