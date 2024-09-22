import foodModel from "../models/foodModel.js";
import fs from "fs"; //file system prebuilt in node

//add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({}); //get all the data of the food items
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove food item

const removeFood = async (req, res) => {
    try {
      const food = await foodModel.findById(req.body.id);
    //   console.log('Found food:', food); // Log the food object
    //   if (!food) {
    //     console.log('Food not found'); // Log if food is null
    //     return res.json({ success: false, message: 'Food not found' });
    //   }
      fs.unlink(`uploads/${food.image}`, () => {});
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: 'Food Removed' });
    } catch (error) {
      console.log('Error removing food:', error);
      res.json({ success: false, message: 'Error' });
    }
  };
  

export { addFood, listFood, removeFood };