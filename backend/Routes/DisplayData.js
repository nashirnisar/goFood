const express = require("express");
const router = express.Router()

router.post("/foodData",(req,res)=>{
    try{
        res.send([global.food_items, global.food_Category])
        // res.status(200).send({food_items: global.food_items, foodCategory: global.food_Category})
    }
    catch(err){
        console.error(err)
        res.send("Server error")
    }
})

module.exports = router;