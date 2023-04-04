const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://<username>:<password>@cluster0.9oxbrdx.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected to db");
    const foodItems = await mongoose.connection.db.collection("food_items");
    const foodCategory = await mongoose.connection.db.collection(
      "food_Category"
    );
    const foodItemsData = await foodItems.find({}).toArray();
    const foodCategoryData = await foodCategory.find({}).toArray();
    global.food_items = foodItemsData;
    global.food_Category= foodCategoryData;
  } catch (err) {
    console.log("...", err);
  }
};

module.exports = mongoDB;
