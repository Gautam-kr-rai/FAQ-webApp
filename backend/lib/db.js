import mongoose from "mongoose";

export const connectdb = async ()=>{
      
     try {

      const conn = await mongoose.connect(process.env.MONGO_URI);

      console.log(`mongodb connected on ${conn.connection.host}`);
      
     } catch (error) {

      console.log("error in connecting mongoose db")

      process.exit(1);
      
     }
}