
const dotEnv=require('dotenv').config()
const express = require('express');
const mongoose=require('mongoose')
const routes=require('./view/routes')
require('dotenv').config()
 const app = express();
mongoose.connect(process.env.DB,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use(express.json());
app.use("/api/recipes",routes);
app.listen(5500, () => {
    console.log("server is running on port 5500")
})  


