import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://foodmunch:FoodMunch963@cluster0.300rj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("DB Connected"));
};